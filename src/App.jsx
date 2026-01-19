import { useEffect, useMemo, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import "./App.css";
import icon from "./assets/logo.svg";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "Who We Are",
    "nav.services": "Services",
    "nav.assurance": "Credentials",
    "nav.contact": "Contact",
    "hero.description":
      "Trusted masonry company, proudly managed by Mathieu Courville.",
    "cta.call": "Call",
    "cta.quote": "Request a Quote",
    "cta.email": "Send an Email",
    "about.title": "Who We Are",
    "about.card1.p1":
      "Since its founding, Maçonnerie Grand-Duc has embodied artisanal excellence and organizational rigor. Led by Mathieu Courville, we deliver residential and commercial projects focused on quality, durability, and respect for tradition.",
    "about.card1.p2":
      "Our seasoned masons master every technique, from structural work to bespoke finishes. Each job site is managed with transparency, safety, and meticulous attention to detail, ensuring flawless execution and timeless results.",
    "about.card1.p3":
      "Built stone by stone, our reputation rests on trust with partners, suppliers, and clients. Maçonnerie Grand-Duc remains your strategic ally for work that stands the test of time with elegance.",
    "about.card1.signature": "Mathieu Courville, Managing Director",
    "about.card2.p1":
      "We blend ancestral know-how with modern innovations to offer comprehensive services tailored to your needs. Every intervention complies with current standards and meets the highest aesthetic expectations.",
    "about.card2.p2":
      "Our mission: protect, restore, and elevate Québec’s built heritage while guiding a new generation of owners through construction and major renovation projects.",
    "services.title": "Services",
    "services.intro":
      "Comprehensive masonry solutions to reinforce, protect, and showcase your property. Every intervention is executed with precision, durability, and respect for heritage.",
    "services.card1.title": "Brick & Stone Installation",
    "services.card1.desc":
      "Precision laying of brick, block, and natural stone for new builds, additions, and façade upgrades.",
    "services.card2.title": "Tuckpointing & Repointing",
    "services.card2.desc":
      "Renew mortar joints to seal out moisture, correct deterioration, and restore the character of your masonry.",
    "services.card3.title": "Sill & Lintel Replacement",
    "services.card3.desc":
      "Remove and replace compromised window sills and structural lintels to safeguard openings and load paths.",
    "services.card4.title": "Bulged Wall Repair",
    "services.card4.desc":
      "Stabilize bowing or bulged masonry with structural reinforcement, selective rebuilding, and anchoring systems.",
    "services.card5.title": "Expansion Joints",
    "services.card5.desc":
      "Install or refresh expansion joints to absorb movement, prevent cracking, and extend the life of exterior walls.",
    "services.card6.title": "Selective Demolition",
    "services.card6.desc":
      "Careful dismantling of masonry elements to prepare for restoration, upgrades, or safe removal of damaged sections.",
    "services.card7.title": "Professional Caulking",
    "services.card7.desc":
      "Durable, weather-tight caulking to prevent water infiltration, air leaks, and energy loss around critical junctions.",
    "assurance.title": "Credentials & Assurance",
    "assurance.licenses.title": "Licenses & Certifications",
    "assurance.licenses.label": "RBQ:",
    "assurance.licenses.description":
      "We operate under current provincial licenses, ensuring work that meets building codes and industry standards.",
    "badges.rbq": "RBQ Certified",
    "badges.insurance": "Liability Insurance",
    "badges.safety": "Safe Worksites",
    "testimonial.quote":
      "“Organized, punctual, and exceptionally professional. The result exceeded our expectations and showcases our property.”",
    "testimonial.author": "– Residential Client, Montréal",
    "contact.title": "Contact",
    "contact.label.title": "Title",
    "contact.role": "Managing Director",
    "contact.label.phone": "Phone",
    "contact.label.email": "Email",
    "form.label.name": "Full Name",
    "form.label.email": "Email",
    "form.label.phone": "Phone",
    "form.label.message": "About Your Project",
    "form.placeholder.name": "Your name",
    "form.placeholder.email": "name@example.com",
    "form.placeholder.phone": "(xxx) xxx-xxxx",
    "form.placeholder.message": "Describe your masonry needs...",
    "form.submit": "Submit Request",
    "form.sending": "Sending…",
    "form.success": "Thanks! We’ll contact you shortly.",
    "form.error": "Oops! Something went wrong. Please try again.",
    "footer.tagline": "Building with distinction, inspired by heritage.",
    "footer.rights": "All rights reserved.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "Qui nous sommes",
    "nav.services": "Services",
    "nav.assurance": "Certifications",
    "nav.contact": "Contact",
    "hero.description":
      "Entreprise de maçonnerie de confiance, fièrement dirigée par Mathieu Courville.",
    "cta.call": "Appeler",
    "cta.quote": "Demander une soumission",
    "cta.email": "Envoyer un courriel",
    "about.title": "Qui nous sommes",
    "about.card1.p1":
      "Depuis sa fondation, Maçonnerie Grand-Duc incarne l'excellence artisanale et la rigueur organisationnelle. Sous la direction de Mathieu Courville, nous réalisons des projets résidentiels et commerciaux axés sur la qualité, la durabilité et le respect des traditions.",
    "about.card1.p2":
      "Nos maçons d'expérience maîtrisent toutes les techniques, des travaux structuraux aux finitions sur mesure. Chaque chantier est géré avec transparence, sécurité et souci du détail afin d'assurer une exécution impeccable et des résultats intemporels.",
    "about.card1.p3":
      "Bâtie pierre par pierre, notre réputation repose sur la confiance de nos partenaires, fournisseurs et clients. Maçonnerie Grand-Duc demeure votre allié stratégique pour des travaux qui traversent le temps avec élégance.",
    "about.card1.signature": "Mathieu Courville, Directeur général",
    "about.card2.p1":
      "Nous marions un savoir-faire ancestral aux innovations modernes pour offrir des services complets adaptés à vos besoins. Chaque intervention respecte les normes en vigueur et répond aux attentes esthétiques les plus élevées.",
    "about.card2.p2":
      "Notre mission : protéger, restaurer et mettre en valeur le patrimoine bâti du Québec tout en accompagnant une nouvelle génération de propriétaires dans leurs projets de construction et de rénovation majeure.",
    "services.title": "Services",
    "services.intro":
      "Une gamme complète de services pour rehausser vos structures, des fondations aux finitions. Chaque projet est guidé par notre vision : bâtir avec précision et fierté.",
    "services.card1.title": "Pose de brique et pierre",
    "services.card1.desc":
      "Gestion clé en main de vos projets de maçonnerie, coordination des équipes et des échéanciers pour une exécution sans compromis.",
    "services.card2.title": "Rejointoiement",
    "services.card2.desc":
      "Assemblage expert de briques, blocs et pierres naturelles avec des finitions dignes des bâtiments emblématiques.",
    "services.card3.title": "Changement d'allège et linteau",
    "services.card3.desc":
      "Rejointoiement, stabilisation et remplacement des éléments défaillants afin de restaurer la solidité des murs et des fondations.",
    "services.card4.title": "Réparation de ventre de boeuf",
    "services.card4.desc":
      "Interventions délicates sur les bâtiments historiques, dans le respect des matériaux d'origine et des normes de conservation.",
    "services.card5.title": "Joint d'expansion",
    "services.card5.desc":
      "Créations sur mesure pour corniches, linteaux, murs signature et éléments architecturaux distinctifs.",
    "services.card6.title": "Démolition",
    "services.card6.desc":
      "Services de démolition sécuritaires et efficaces, préparant le terrain pour vos nouveaux projets de construction ou de rénovation.",
    "services.card7.title": "Calfeutrage",
    "services.card7.desc":
      "Solutions de calfeutrage durables pour protéger vos structures contre les infiltrations d'eau et améliorer l'efficacité énergétique.",
    "assurance.title": "Certifications et garanties",
    "assurance.licenses.title": "Licences et certifications",
    "assurance.licenses.label": "RBQ :",
    "assurance.licenses.description":
      "Nous détenons les licences provinciales en vigueur, assurant des travaux conformes aux codes du bâtiment et aux normes de l'industrie.",
    "badges.rbq": "Certifié RBQ",
    "badges.insurance": "Assurance responsabilité",
    "badges.safety": "Chantiers sécuritaires",
    "testimonial.quote":
      "« Organisés, ponctuels et remarquablement professionnels. Le résultat dépasse nos attentes et met en valeur notre propriété. »",
    "testimonial.author": "– Client résidentiel, Montréal",
    "contact.title": "Contact",
    "contact.label.title": "Titre",
    "contact.role": "Directeur général",
    "contact.label.phone": "Téléphone",
    "contact.label.email": "Courriel",
    "form.label.name": "Nom complet",
    "form.label.email": "Courriel",
    "form.label.phone": "Téléphone",
    "form.label.message": "À propos de votre projet",
    "form.placeholder.name": "Votre nom",
    "form.placeholder.email": "nom@example.com",
    "form.placeholder.phone": "(xxx) xxx-xxxx",
    "form.placeholder.message": "Décrivez votre projet de maçonnerie...",
    "form.submit": "Soumettre la demande",
    "form.sending": "Envoi en cours…",
    "form.success": "Merci! Nous vous contacterons sous peu.",
    "form.error": "Oups! Une erreur est survenue. Veuillez réessayer.",
    "footer.tagline": "Construire avec distinction, inspiré par le patrimoine.",
    "footer.rights": "Tous droits réservés.",
  },
};

const currentYear = new Date().getFullYear();

const navLinks = [
  { id: "hero", labelKey: "nav.home" },
  { id: "about", labelKey: "nav.about" },
  { id: "services", labelKey: "nav.services" },
  { id: "assurance", labelKey: "nav.assurance" },
  { id: "contact", labelKey: "nav.contact" },
];

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

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

function ContactForm({ lang, t }) {
  const [formValues, setFormValues] = useState(() => ({ ...initialForm }));
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);
  const hasErrors = Array.isArray(state.errors) && state.errors.length > 0;

  useEffect(() => {
    if (state.succeeded) {
      setFormValues(() => ({ ...initialForm }));
    }
  }, [state.succeeded]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    handleSubmit(event);
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
        required
      />

      <label htmlFor="email">{t("form.label.email")}</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder={t("form.placeholder.email")}
        value={formValues.email}
        onChange={handleChange}
        required
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <label htmlFor="phone">{t("form.label.phone")}</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder={t("form.placeholder.phone")}
        value={formValues.phone}
        onChange={handleChange}
      />

      <label htmlFor="message">{t("form.label.message")}</label>
      <textarea
        id="message"
        name="message"
        placeholder={t("form.placeholder.message")}
        value={formValues.message}
        onChange={handleChange}
        required
      />
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

      <button type="submit" className="btn-outline" disabled={state.submitting}>
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

function App() {
  const [lang, setLang] = usePreferredLanguage("fr");

  const t = (key) => translations[lang]?.[key] ?? translations.fr[key] ?? key;

  const handleNavClick = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
    [t]
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

        <section id="assurance">
          <div className="section-inner">
            <h2 className="section-title">{t("assurance.title")}</h2>
            <div className="credentials">
              <div className="credential-item">
                <h4>{t("assurance.licenses.title")}</h4>
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
                    maconneriegamma@gmail.com
                  </div>
                  <div className="contact-actions">
                    <a className="btn-outline" href="tel:438-888-9044">
                      {t("cta.call")}
                    </a>
                    <a
                      className="btn-outline"
                      href="mailto:maconneriegamma@gmail.com"
                    >
                      {t("cta.email")}
                    </a>
                  </div>
                </div>
                <div className="map-embed">
                  <iframe
                    title="Maçonnerie Grand-Duc Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6652.712416241786!2d-73.40250549904331!3d45.48750785135877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9067fa9a92d63%3A0xf65a6cd99a73a1b0!2zMjg2MCBSdWUgUXVldmlsbG9uLCBTYWludC1IdWJlcnQsIFFDIEozWSA1SDMsINCa0LDQvdCw0LTQsA!5e0!3m2!1suk!2sua!4v1768510094520!5m2!1suk!2sua"
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
