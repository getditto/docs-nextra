import { createContext } from "react"

interface LanguageContextProps {
  language: string
  handleLanguageChange: (language: string) => void
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
)

export default LanguageContext
