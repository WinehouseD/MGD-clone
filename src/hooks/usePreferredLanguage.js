import { useState, useEffect } from "react";

export default function usePreferredLanguage(defaultLang = "fr") {
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
