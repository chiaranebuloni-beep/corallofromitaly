'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dict } from './i18n';

const LangContext = createContext({ lang: 'it', t: dict.it, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('it');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('corallo-lang');
      if (saved === 'en' || saved === 'it') setLangState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem('corallo-lang', l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, t: dict[lang], setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
