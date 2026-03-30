import { useEffect, useMemo, useState } from "react";
import { faqKeys, serviceCards as SERVICE_DATA } from "../constants";
import icon from "../assets/logo.svg";
import FAQItem from "../components/FaqItem";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

export default function HomePage({ lang, setLang, t }) {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = t("meta.title");

    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };

    setMeta('meta[name="description"]', "content", t("meta.description"));
    setMeta('meta[property="og:title"]', "content", t("meta.title"));
    setMeta(
      'meta[property="og:description"]',
      "content",
      t("meta.description"),
    );
  }, [lang, t]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
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
    () =>
      SERVICE_DATA.map((service) => ({
        ...service,
        title: t(service.titleKey),
        description: t(service.descKey),
        icon: service.icon,
      })),
    [t],
  );

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />

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
              {serviceCards.map(({ key, slug, icon, title, description }) => (
                <article
                  key={key}
                  className="service-card"
                  onClick={() => navigate(`/services/${slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      navigate(`/services/${slug}`);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={title}
                  style={{ cursor: "pointer" }}
                >
                  {icon}
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="service-card-cta" aria-hidden="true">
                    {t("service.card.readmore")} →
                  </span>
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
                  />
                </div>
              </div>
              <div className="offer-form-col">
                <ContactForm lang={lang} t={t} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} setLang={setLang} t={t} />
    </>
  );
}
