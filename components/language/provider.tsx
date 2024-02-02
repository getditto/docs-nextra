import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import LanguageContext from "./context"
import { useRouter } from "next/router"

const LanguageProvider = ({ children }) => {
  const router = useRouter()
  const [language, setLanguage] = useState(Cookies.get("language") || undefined)

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)
    Cookies.set("language", newLanguage)
    const currentUrlParams = new URLSearchParams(window.location.search)
    currentUrlParams.set("language", newLanguage)
    router.push(
      `${router.pathname}?${currentUrlParams.toString()}`,
      undefined,
      { shallow: false, scroll: false}
    )
  }

  useEffect(() => {
    const languageFromQuery = new URLSearchParams(
      router.asPath.split("?")[1]
    ).get("language")
    const languageFromCookie = Cookies.get("language")

    if (languageFromQuery && language !== languageFromQuery) {
      handleLanguageChange(languageFromQuery)
    } else if (languageFromCookie && language !== languageFromCookie) {
      // set language from cookie
      handleLanguageChange(languageFromCookie)
    } else if (!language) {
      // default language
      handleLanguageChange("javascript")
    }
  }, [router.asPath])

  return (
    <LanguageContext.Provider value={{ language, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
