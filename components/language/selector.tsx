import { useContext } from "react"
import LanguageContext from "./context"

const LanguageSelector = () => {
  const { language, handleLanguageChange } = useContext(LanguageContext)

  return (
    <select
      value={language}
      onChange={(event) => handleLanguageChange(event.target.value)}
    >
      <option value="javascript">JavaScript</option>
      <option value="java">Java</option>
      <option value="csharp">C#</option>
      <option value="cpp">C++</option>
      <option value="rust">Rust</option>
    </select>
  )
}

export default LanguageSelector
