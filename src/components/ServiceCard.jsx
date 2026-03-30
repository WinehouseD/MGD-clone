import { useNavigate } from "react-router-dom";

export function ServiceCard({ slug, icon, title, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${slug}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/services/${slug}`);
    }
  };

  return (
    <article
      className="service-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={title}
      style={{ cursor: "pointer" }}
    >
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="service-card-cta" aria-hidden="true">
        →
      </span>
    </article>
  );
}
