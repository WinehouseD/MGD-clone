import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import translations from "../i18n";
import usePreferredLanguage from "../hooks/usePreferredLanguage";
import HomePage from "../pages/Home";
import ServicePage from "../pages/ServicePage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";

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
      <Route
        path="/privacy"
        element={<PrivacyPage lang={lang} setLang={setLang} t={t} />}
      />
      <Route
        path="/terms"
        element={<TermsPage lang={lang} setLang={setLang} t={t} />}
      />
      <Route path="*" element={<HomePage {...sharedProps} />} />
    </Routes>
  );
}

export default AppRouter;
