import { useEffect, useMemo, useState } from "react";
import "./App.css";
import icon from "./assets/logo.PNG";

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
      "A complete suite of services to enhance your structures, from foundation to finish. Every project is guided by our vision: build with precision and pride.",
    "services.card1.title": "General Contracting",
    "services.card1.desc":
      "End-to-end management of your masonry projects, coordinating crews and timelines for uncompromised execution.",
    "services.card2.title": "Specialized Masonry",
    "services.card2.desc":
      "Expert assembly for brick, block, and natural stone with finishes worthy of landmark architecture.",
    "services.card3.title": "Structural Repairs",
    "services.card3.desc":
      "Repointing, stabilization, and replacement of failing elements to restore the strength of walls and foundations.",
    "services.card4.title": "Heritage Restoration",
    "services.card4.desc":
      "Delicate interventions on historic buildings, respecting original materials and preservation standards.",
    "services.card5.title": "Custom Stonework",
    "services.card5.desc":
      "Bespoke creations for cornices, lintels, feature walls, and signature architectural elements.",
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
    "services.card1.title": "Entrepreneur général",
    "services.card1.desc":
      "Gestion clé en main de vos projets de maçonnerie, coordination des équipes et des échéanciers pour une exécution sans compromis.",
    "services.card2.title": "Maçonnerie spécialisée",
    "services.card2.desc":
      "Assemblage expert de briques, blocs et pierres naturelles avec des finitions dignes des bâtiments emblématiques.",
    "services.card3.title": "Réparations structurales",
    "services.card3.desc":
      "Rejointoiement, stabilisation et remplacement des éléments défaillants afin de restaurer la solidité des murs et des fondations.",
    "services.card4.title": "Restauration patrimoniale",
    "services.card4.desc":
      "Interventions délicates sur les bâtiments historiques, dans le respect des matériaux d'origine et des normes de conservation.",
    "services.card5.title": "Ouvrages de pierre sur mesure",
    "services.card5.desc":
      "Créations sur mesure pour corniches, linteaux, murs signature et éléments architecturaux distinctifs.",
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
          <svg className="service-icon" viewBox="0 0 64 64">
            <rect
              x="8"
              y="20"
              width="48"
              height="32"
              rx="6"
              ry="6"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M16 34h32M16 44h32"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M24 12l8-4 8 4"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="32" cy="26" r="6" fill="#16264b" opacity="0.45" />
          </svg>
        ),
      },
      {
        key: "card2",
        title: t("services.card2.title"),
        description: t("services.card2.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64">
            <rect
              x="10"
              y="14"
              width="44"
              height="36"
              rx="4"
              ry="4"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M14 24h36M14 34h36M14 44h36"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M20 24v20M32 24v20M44 24v20"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="32"
              cy="12"
              r="5"
              fill="#e5e8f0"
              stroke="#16264b"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        key: "card3",
        title: t("services.card3.title"),
        description: t("services.card3.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64">
            <path
              d="M12 28l40-12-12 40-18 5 6-20-16-13z"
              fill="#16264b"
              opacity="0.15"
            />
            <path
              d="M12 28l16 13-6 20m22-45l-6 20"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="24" cy="52" r="4" fill="#16264b" />
            <circle
              cx="38"
              cy="18"
              r="4"
              fill="#e5e8f0"
              stroke="#16264b"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        key: "card4",
        title: t("services.card4.title"),
        description: t("services.card4.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64">
            <path
              d="M16 48h32l4-24-20-16-20 16z"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M12 28h40M16 48l4-20 12-12 12 12 4 20"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M18 20l6-8M46 20l-6-8"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        key: "card5",
        title: t("services.card5.title"),
        description: t("services.card5.desc"),
        icon: (
          <svg className="service-icon" viewBox="0 0 64 64">
            <path
              d="M18 48l-6-18 14-14 18 2 8 16-12 14z"
              fill="#16264b"
              opacity="0.12"
            />
            <path
              d="M12 30l14-14 18 2 8 16-12 14-20-4z"
              stroke="#16264b"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 16l12 24"
              stroke="#e5e8f0"
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
            <div className="contact-card">
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

              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  // Hook up to your form handler or service here
                }}
              >
                <label htmlFor="name">{t("form.label.name")}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={t("form.placeholder.name")}
                  required
                />

                <label htmlFor="email">{t("form.label.email")}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={t("form.placeholder.email")}
                  required
                />

                <label htmlFor="phone">{t("form.label.phone")}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder={t("form.placeholder.phone")}
                />

                <label htmlFor="message">{t("form.label.message")}</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={t("form.placeholder.message")}
                  required
                />

                <button type="submit" className="btn-outline">
                  {t("form.submit")}
                </button>
              </form>
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
