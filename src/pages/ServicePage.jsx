import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { serviceCards } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ServicePage({ lang, setLang, t }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = serviceCards.find((s) => s.slug === slug);

  useEffect(() => {
    if (!service) {
      navigate("/", { replace: true });
    }
  }, [service, navigate]);

  useEffect(() => {
    if (!service) return;

    const pageTitle = t(service.metaTitleKey);
    const pageDesc = t(service.metaDescKey);

    document.title = pageTitle;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', "content", pageDesc);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", pageDesc);
    setMeta('meta[property="og:url"]', "content", window.location.href);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);

    let jsonLd = document.getElementById("service-jsonld");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.id = "service-jsonld";
      jsonLd.type = "application/ld+json";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: t(service.titleKey),
      description: t(service.descKey),
      provider: {
        "@type": "LocalBusiness",
        name: "Maçonnerie Grand-Duc",
        telephone: "438-888-9044",
        email: "maconnerie@grand-duc.ca",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3231 Rue de Bellechasse #2",
          addressLocality: "Montréal",
          addressRegion: "QC",
          postalCode: "H1Y 1K3",
          addressCountry: "CA",
        },
      },
      areaServed: {
        "@type": "City",
        name: "Montréal",
      },
      url: window.location.href,
    });

    return () => {
      const el = document.getElementById("service-jsonld");
      if (el) el.remove();
      const canonicalEl = document.querySelector('link[rel="canonical"]');
      if (canonicalEl) canonicalEl.remove();
    };
  }, [service, lang, t]);

  if (!service) return null;

  const currentIndex = serviceCards.findIndex((s) => s.slug === slug);
  const prevService = serviceCards[currentIndex - 1] ?? null;
  const nextService = serviceCards[currentIndex + 1] ?? null;

  return (
    <>
      <Header lang={lang} setLang={setLang} t={t} />

      <main id="top" className="service-page">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link to="/" itemProp="item">
                <span itemProp="name">{t("nav.home")}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="breadcrumb-separator">
              /
            </li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link to="/#services" itemProp="item">
                <span itemProp="name">{t("nav.services")}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true" className="breadcrumb-separator">
              /
            </li>
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span itemProp="name" aria-current="page">
                {t(service.titleKey)}
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <section className="service-hero">
          <div className="service-hero-inner">
            <div className="service-hero-text">
              <h1>{t(service.titleKey)}</h1>
              <p>{t(service.descKey)}</p>
              <div className="cta-buttons">
                <a className="btn-primary" href="tel:438-888-9044">
                  {t("cta.call")}
                </a>
                <Link className="btn-primary" to="/#contact">
                  {t("cta.quote")}
                </Link>
              </div>
            </div>
            <div className="service-hero-image">
              <img
                src={service.image}
                alt={t(service.imageAltKey)}
                width={600}
                height={400}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="service-detail">
          <div className="section-inner">
            <div className="service-detail-grid">
              <div className="service-detail-main">
                <h2>{t(`${service.key}.detail.title`)}</h2>
                <p>{t(`${service.key}.detail.body1`)}</p>
                <p>{t(`${service.key}.detail.body2`)}</p>

                <h3>{t("service.detail.includes.title")}</h3>
                <ul className="service-includes-list">
                  {[1, 2, 3, 4].map((i) => {
                    const item = t(`${service.key}.detail.include${i}`);
                    return item !== `${service.key}.detail.include${i}` ? (
                      <li key={i}>{item}</li>
                    ) : null;
                  })}
                </ul>
              </div>

              <aside className="service-detail-sidebar">
                <div className="service-sidebar-card">
                  <h3>{t("service.sidebar.cta.title")}</h3>
                  <p>{t("service.sidebar.cta.body")}</p>
                  <a className="btn-outline" href="tel:438-888-9044">
                    {t("cta.call")}
                  </a>
                </div>

                <div className="service-sidebar-card">
                  <h3>{t("service.sidebar.related.title")}</h3>
                  <ul className="related-services-list">
                    {serviceCards
                      .filter((s) => s.slug !== slug)
                      .slice(0, 4)
                      .map((s) => (
                        <li key={s.key}>
                          <Link to={`/services/${s.slug}`}>
                            {t(s.titleKey)}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <nav className="service-pagination" aria-label="Service navigation">
          <div className="section-inner service-pagination-inner">
            {prevService ? (
              <Link
                to={`/services/${prevService.slug}`}
                className="pagination-link prev"
              >
                <span aria-hidden="true">←</span>
                <span>{t(prevService.titleKey)}</span>
              </Link>
            ) : (
              <span />
            )}
            {nextService ? (
              <Link
                to={`/services/${nextService.slug}`}
                className="pagination-link next"
              >
                <span>{t(nextService.titleKey)}</span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </main>

      <Footer lang={lang} setLang={setLang} t={t} />
    </>
  );
}

export default ServicePage;
