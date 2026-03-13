import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { translations } from "../utils/translations";

// ─────────────────────────────────────────────
//  LanguageContext  —  i18n for SteadyRise
//  Supported locales: "en" | "id"
//  Default: follows browser language, fallback "en"
// ─────────────────────────────────────────────

const SUPPORTED = ["en", "id"];

/** Detect browser preferred language, return "en" or "id" */
function getBrowserLang() {
  const raw = navigator?.language || navigator?.languages?.[0] || "en";
  const code = raw.toLowerCase().split("-")[0]; // e.g. "id-ID" → "id"
  return SUPPORTED.includes(code) ? code : "en";
}

const LanguageCtx = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useLocalStorage("sr_lang", getBrowserLang());

  /** Toggle between EN ↔ ID */
  const toggleLang = () => setLang((l) => (l === "en" ? "id" : "en"));

  /** Switch to a specific locale: setLanguage("id") */
  const setLanguage = (locale) => {
    if (translations[locale]) setLang(locale);
  };

  /** Shorthand accessor — use in components: const { t } = useLanguage() */
  const t = translations[lang] ?? translations["en"];

  return (
    <LanguageCtx.Provider value={{ lang, t, toggleLang, setLanguage }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export const useLanguage = () => useContext(LanguageCtx);
