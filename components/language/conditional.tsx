import { useContext, useState, useEffect } from "react"
import LanguageContext from "./context"

const LanguageConditional = ({ lang, children }) => {
  const { language } = useContext(LanguageContext)
  const [isLoaded, setIsLoaded] = useState(false)

  // Copilot added this because of hydration issues
  useEffect(() => {
    if (language !== undefined) {
      setIsLoaded(true)
    }
  }, [language])

  if (!isLoaded) {
    return null
  }

  return lang === language ? children : null
}

export default LanguageConditional
