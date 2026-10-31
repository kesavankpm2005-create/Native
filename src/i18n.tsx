import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  type Language,
  type FontSize,
  type LocationInfo,
  tamilNaduLocations,
  translations,
} from './i18nData'

export type { Language, FontSize, LocationInfo }

type I18nContextType = {
  lang: Language
  setLang: (lang: Language) => void
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  location: LocationInfo
  setLocation: (loc: LocationInfo) => void
  t: (typeof translations)['en'] | (typeof translations)['ta']
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('native_lang') as Language | null
    return saved === 'en' ? 'en' : 'ta'
  })

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('native_font_size') as FontSize | null
    return saved === 'large' || saved === 'xlarge' ? saved : 'normal'
  })

  const [location, setLocationState] = useState<LocationInfo>(() => {
    const savedId = localStorage.getItem('native_location')
    const found = tamilNaduLocations.find((l) => l.id === savedId)
    return found ?? tamilNaduLocations[0]
  })

  function setLang(newLang: Language) {
    setLangState(newLang)
    localStorage.setItem('native_lang', newLang)
    document.documentElement.lang = newLang
  }

  function setFontSize(newSize: FontSize) {
    setFontSizeState(newSize)
    localStorage.setItem('native_font_size', newSize)
    document.documentElement.setAttribute('data-font-size', newSize)
  }

  function setLocation(newLoc: LocationInfo) {
    setLocationState(newLoc)
    localStorage.setItem('native_location', newLoc.id)
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [lang, fontSize])

  const t = translations[lang]

  return (
    <I18nContext.Provider value={{ lang, setLang, fontSize, setFontSize, location, setLocation, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
