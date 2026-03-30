import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import translations from "../i18n";
import usePreferredLanguage from "../hooks/usePreferredLanguage";
import HomePage from "../pages/Home";
import ServicePage from "../pages/ServicePage";

function AppRouter() {
  const [lang, setLang] = usePreferredLanguage("fr");

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations.fr[key] ?? key,
    [lang],
  );

  const sharedProps = { lang, setLang, t };

  return (
    <Routes>
      <Route path="/" element={<HomePage {...sharedProps} />} />
      <Route
        path="/services/:slug"
        element={<ServicePage {...sharedProps} />}
      />
      <Route path="*" element={<HomePage {...sharedProps} />} />
    </Routes>
  );
}

export default AppRouter;
