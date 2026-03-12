import { useEffect, useMemo, useState, useCallback } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./App.css";
import icon from "/logo.svg";
import translations from "./i18n";
import { navLinks, faqKeys, languages } from "./constants";

const currentYear = new Date().getFullYear();

function GTMNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MB6HVFXN"
          height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );
}

function usePreferredLanguage(defaultLang = "fr") {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return defaultLang;
    return localStorage.getItem("preferredLanguage") ?? defaultLang;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("preferredLanguage", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  return [lang, setLang];
}

const FORMSPREE_FORM_ID = "xreegkob";
const initialForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 0) return true;
  if (digits.length !== 10) return false;
  if (digits[0] === "0" || digits[0] === "1") return false;
  if (digits[3] === "0" || digits[3] === "1") return false;
  return true;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidName(value) {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  if (trimmed.length > 80) return false;
  return /^[a-zA-ZÀ-ÿ\s'-]+$/.test(trimmed);
}

function isValidMessage(value) {
  const trimmed = value.trim();
  return trimmed.length >= 10 && trimmed.length <= 500;
}

export function ContactForm({ lang, t }) {
  const [formValues, setFormValues] = useState({ ...initialForm });
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const hasErrors = Array.isArray(state.errors) && state.errors.length > 0;

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const nameValid = isValidName(formValues.name);
  const emailValid = isValidEmail(formValues.email);
  const phoneValid = isValidPhone(formValues.phone);
  const messageValid = isValidMessage(formValues.message);

  const showNameError = touched.name && !nameValid;
  const showEmailError = touched.email && !emailValid;
  const showPhoneError = touched.phone && !phoneValid;
  const showMessageError = touched.message && !messageValid;

  const isFormValid = nameValid && emailValid && phoneValid && messageValid;
  const isButtonDisabled = !isFormValid || state.submitting;

  useEffect(() => {
    if (state.succeeded) {
      setFormValues({ ...initialForm });
      setTouched({ name: false, email: false, phone: false, message: false });
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormValues((prev) => ({ ...prev, phone: formatted }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const onSubmit = (e) => {
    setTouched({ name: true, email: true, phone: true, message: true });

    if (!isFormValid) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="name">{t("form.label.name")}</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder={t("form.placeholder.name")}
        value={formValues.name}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        maxLength={80}
        aria-invalid={showNameError}
        aria-describedby={showNameError ? "name-error" : undefined}
        className={showNameError ? "input-error" : ""}
      />
      {showNameError && (
        <p id="name-error" className="field-error" role="alert">
          {t("form.error.name")}
        </p>
      )}

      <label htmlFor="email">{t("form.label.email")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form.placeholder.email")}
        value={formValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        aria-invalid={showEmailError}
        aria-describedby={showEmailError ? "email-error" : undefined}
        className={showEmailError ? "input-error" : ""}
      />
      {showEmailError && (
        <p id="email-error" className="field-error" role="alert">
          {t("form.error.email")}
        </p>
      )}
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="phone">{t("form.label.phone")}</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="(514) 555-1234"
        value={formValues.phone}
        onChange={handlePhoneChange}
        onBlur={handleBlur}
        maxLength={14}
        aria-invalid={showPhoneError}
        aria-describedby={showPhoneError ? "phone-error" : undefined}
        className={showPhoneError ? "input-error" : ""}
      />
      {showPhoneError && (
        <p id="phone-error" className="field-error" role="alert">
          {t("form.error.phone")}
        </p>
      )}

      <label htmlFor="message">{t("form.label.message")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form.placeholder.message")}
        value={formValues.message}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        maxLength={500}
        aria-invalid={showMessageError}
        aria-describedby={showMessageError ? "message-error" : undefined}
        className={showMessageError ? "input-error" : ""}
      />
      {showMessageError && (
        <p id="message-error" className="field-error" role="alert">
          {t("form.error.message")}
        </p>
      )}
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <input type="hidden" name="_language" value={lang} />
      <input type="hidden" name="_subject" value="New masonry inquiry" />
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
        tabIndex="-1"
        autoComplete="off"
      />

      <button
        type="submit"
        className={isButtonDisabled ? "btn-outline-disabled" : "btn-outline"}
        disabled={isButtonDisabled}
      >
        {state.submitting ? t("form.sending") : t("form.submit")}
      </button>

      {state.succeeded && (
        <p role="status" className="form-success">
          {t("form.success")}
        </p>
      )}

      {hasErrors && !state.submitting && !state.succeeded && (
        <p role="status" className="form-error">
          {t("form.error")}
        </p>
      )}
    </form>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className={`faq-icon ${isOpen ? "open" : ""}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  const [lang, setLang] = usePreferredLanguage("fr");
  const [openFAQ, setOpenFAQ] = useState(null);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.fr[key] ?? key,
    [lang],
  );

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const faqItems = useMemo(
    () =>
      faqKeys.map(({ questionKey, answerKey }) => ({
        question: t(questionKey),
        answer: t(answerKey),
      })),
    [t],
  );

  const serviceCards = useMemo(
    () => [
      {
        key: "card1",
        title: t("services.card1.title"),
        description: t("services.card1.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="10"
              y="22"
              width="44"
              height="26"
              rx="4"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M10 30h44M10 38h44"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M22 22v12M34 22v12M46 22v12"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M28 12l8 8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M38 18l8 8-10 4-6-6z" fill="#16264b" opacity="0.6" />
            <circle cx="28" cy="12" r="3" fill="#16264b" />
          </svg>
        ),
      },
      {
        key: "card2",
        title: t("services.card2.title"),
        description: t("services.card2.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="12"
              y="20"
              width="40"
              height="24"
              rx="4"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M12 28h40M12 36h40"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M22 20v24M34 20v24"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M14 32h36"
              stroke="#16264b"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path d="M20 44l8-8 6 6-8 8" fill="#16264b" opacity="0.65" />
            <path
              d="M28 36l10-10"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        key: "card3",
        title: t("services.card3.title"),
        description: t("services.card3.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="14"
              y="16"
              width="36"
              height="32"
              rx="4"
              fill="#16264b"
              opacity="0.12"
            />
            <rect
              x="20"
              y="22"
              width="24"
              height="20"
              fill="none"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <rect
              x="16"
              y="18"
              width="32"
              height="6"
              rx="2"
              fill="#16264b"
              opacity="0.6"
            />
            <rect
              x="16"
              y="40"
              width="32"
              height="6"
              rx="2"
              fill="#16264b"
              opacity="0.6"
            />
            <path
              d="M32 12v8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M24 48l-6 8M40 48l6 8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        key: "card4",
        title: t("services.card4.title"),
        description: t("services.card4.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <path
              d="M18 16h20c8 0 14 6 14 16s-6 16-14 16H18z"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M18 16h18c7 0 12 6 12 16s-5 16-12 16H18"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M14 20h6M14 28h10M14 36h12M14 44h10"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M50 20l-4 8 4 8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="54" cy="28" r="4" fill="#16264b" opacity="0.55" />
          </svg>
        ),
      },
      {
        key: "card5",
        title: t("services.card5.title"),
        description: t("services.card5.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="12"
              y="16"
              width="16"
              height="32"
              rx="3"
              fill="#16264b"
              opacity="0.12"
            />
            <rect
              x="36"
              y="16"
              width="16"
              height="32"
              rx="3"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M28 18l8 8-8 8 8 8-8 8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 24h-8M44 24h8M20 40h-8M44 40h8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        key: "card6",
        title: t("services.card6.title"),
        description: t("services.card6.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <rect
              x="12"
              y="28"
              width="40"
              height="20"
              rx="4"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M12 36h40M20 28v20M32 28v20M44 28v20"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M28 14l12 12"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M42 10l8 8-10 10-8-8z" fill="#16264b" opacity="0.55" />
            <path
              d="M44 12l6-6"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        key: "card7",
        title: t("services.card7.title"),
        description: t("services.card7.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M14 34h18l8 8H26z" fill="#16264b" opacity="0.12" />
            <path
              d="M12 28h16l14 14-6 6-14-14H12z"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 42l8-8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M46 18l10 10-12 12-10-10z" fill="#16264b" opacity="0.6" />
            <path
              d="M48 16l6-6"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
    ],
    [t],
  );

  return (
    <>
      <header>
        <div className="nav-container">
          <a className="brand" href="#top" onClick={handleNavClick("hero")}>
            <img
              src={icon}
              alt="Maçonnerie Grand-Duc logo"
              width={40}
              height={50}
              style={{ objectFit: "cover" }}
            />
            Maçonnerie Grand-Duc
          </a>

          <nav className="nav-links">
            {navLinks.map(({ id, labelKey }) => (
              <a key={id} href={`#${id}`} onClick={handleNavClick(id)}>
                {t(labelKey)}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top">
        <section id="hero" className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Maçonnerie Grand-Duc</h1>
              <p>{t("hero.description")}</p>
              <div className="cta-buttons">
                <a className="btn-primary" href="tel:438-888-9044">
                  {t("cta.call")}
                </a>
                <a
                  className="btn-primary"
                  href="#contact"
                  onClick={handleNavClick("contact")}
                >
                  {t("cta.quote")}
                </a>
              </div>
            </div>

            <div className="owl-crest">
              <img
                src={icon}
                alt="Maçonnerie Grand-Duc crest"
                style={{ width: 300, objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        <section id="about">
          <div className="section-inner">
            <h2 className="section-title">{t("about.title")}</h2>
            <div className="about-grid">
              <div className="about-card">
                <p>{t("about.card1.p1")}</p>
                <p>{t("about.card1.p2")}</p>
                <p>{t("about.card1.p3")}</p>
                <p className="signature">{t("about.card1.signature")}</p>
              </div>
              <div className="about-card">
                <p>{t("about.card2.p1")}</p>
                <p>{t("about.card2.p2")}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="section-inner">
            <h2 className="section-title">{t("services.title")}</h2>
            <p>{t("services.intro")}</p>

            <div className="services-grid">
              {serviceCards.map(({ key, icon, title, description }) => (
                <article className="service-card" key={key}>
                  {icon}
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq">
          <div className="section-inner">
            <h2 className="section-title">{t("faq.title")}</h2>
            <div className="faq-container">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="assurance">
          <div className="section-inner">
            <h2 className="section-title">{t("assurance.title")}</h2>
            <div className="credentials">
              <div className="credential-item">
                <h3>{t("assurance.licenses.title")}</h3>
                <p>
                  <span>{t("assurance.licenses.label")} </span>
                  <strong>5651-0033-01</strong>
                  <br />
                  <span>{t("assurance.licenses.description")}</span>
                </p>
                <div className="badge-row">
                  <div className="badge">{t("badges.rbq")}</div>
                  <div className="badge">{t("badges.insurance")}</div>
                  <div className="badge">{t("badges.safety")}</div>
                </div>
              </div>

              <div className="credential-item testimonial">
                <p>{t("testimonial.quote")}</p>
                <span>{t("testimonial.author")}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="section-inner">
            <h2 className="section-title">{t("contact.title")}</h2>
            <div className="contact-offer-grid">
              <div className="contact-map-col">
                <div className="contact-details">
                  <h3>Mathieu Courville</h3>
                  <div className="detail-label">{t("contact.label.title")}</div>
                  <div className="detail-line">{t("contact.role")}</div>
                  <div className="detail-label">{t("contact.label.phone")}</div>
                  <div className="detail-line">438-888-9044</div>
                  <div className="detail-label">{t("contact.label.email")}</div>
                  <div className="detail-line-email">
                    maconnerie@grand-duc.ca
                  </div>
                  <div className="contact-actions">
                    <a className="btn-outline" href="tel:438-888-9044">
                      {t("cta.call")}
                    </a>
                    <a
                      className="btn-outline"
                      href="mailto:maconnerie@grand-duc.ca"
                    >
                      {t("cta.email")}
                    </a>
                  </div>
                </div>
                <div className="map-embed">
                  <iframe
                    title="Maçonnerie Grand-Duc Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.8350632759593!2d-73.58306139999999!3d45.5536434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91953845ca9af%3A0x4c11177866912b2!2s3231%20Rue%20de%20Bellechasse%20%232%2C%20Montreal%2C%20QC%20H1Y%201K3%2C%20Canada!5e0!3m2!1sen!2sua!4v1773344955039!5m2!1sen!2sua"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      borderRadius: 18,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      minHeight: 200,
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="offer-form-col">
                <ContactForm lang={lang} t={t} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <div className="footer-brand">
            <img
              src={icon}
              alt="Maçonnerie Grand-Duc logo"
              style={{ objectFit: "cover" }}
            />
            <div>
              <div className="footer-brand-title">Maçonnerie Grand-Duc</div>
              <div>{t("footer.tagline")}</div>
            </div>
          </div>

          <div className="footer-meta">
            <div>
              © {currentYear} Maçonnerie Grand-Duc. {t("footer.rights")}
            </div>

            <div className="language-toggle">
              {languages.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`language-toggle-button ${
                    lang === code ? "active" : ""
                  }`}
                  aria-pressed={lang === code}
                  onClick={() => setLang(code)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
