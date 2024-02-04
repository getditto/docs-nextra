import { useContext } from "react"
import LanguageContext from "./context"
import languagesData from "./languages"

const LanguageSelector = () => {
  const { language, handleLanguageChange } = useContext(LanguageContext)

  return (
    <select
      value={language}
      onChange={(event) => handleLanguageChange(event.target.value)}
    >
      {languagesData.map((language) => (
        <option key={language.id} value={language.id}>
          {language.label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
