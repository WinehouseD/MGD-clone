import icon from "../assets/logo.svg";
import { languages } from "../constants";
import { Link } from "react-router-dom";

export default function Footer({ lang, setLang, t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <img
            src={icon}
            width={40}
            height={50}
            alt="Maçonnerie Grand-Duc logo"
            loading="lazy"
            decoding="async"
            role="img"
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
          <div className="footer-legal-links">
            <Link to="/privacy">
              {lang === "fr"
                ? "Politique de confidentialité"
                : "Privacy Policy"}
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/terms">
              {lang === "fr" ? "Conditions d'utilisation" : "Terms of Service"}
            </Link>
          </div>
          <div className="language-toggle">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                type="button"
                className={`language-toggle-button ${lang === code ? "active" : ""}`}
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
  );
}
