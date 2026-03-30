import icon from "../assets/logo.svg";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { navLinks } from "../constants";

export default function Header({ t }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header>
      <div className="nav-container">
        <Link className="brand" to="/">
          <img
            src={icon}
            alt="Maçonnerie Grand-Duc logo"
            width={40}
            height={50}
            style={{ objectFit: "cover" }}
          />
          Maçonnerie Grand-Duc
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map(({ id, labelKey }) => (
            <a key={id} href={`/#${id}`} onClick={handleNavClick(id)}>
              {t(labelKey)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
