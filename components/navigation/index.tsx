import { Link } from "nextra-theme-docs"
import languagesData from "../language/languages"
import { useContext, useEffect, useState } from "react"
import LanguageContext from "../language/context"

import s from "./navigation.module.css"

type NavigationProps = {
  pageMap: any
  route: any
}

const Navigation = ({ pageMap, route }: NavigationProps) => {
  const { language } = useContext(LanguageContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const languageIds = new Set(languagesData.map((lang) => lang.id))

  useEffect(() => {
    if (language !== undefined) {
      setIsLoaded(true)
    }
  }, [language])

  const renderLink = (item, active = false) => (
    <Link
      key={item.name}
      href={item.route}
      className={`${s.link} ${active && s.active}`}
    >
      {item.name}
    </Link>
  )

  const languageFolders = pageMap.filter(
    (item) => item.kind === "Folder" && languageIds.has(item.name)
  )
  const otherFolders = pageMap.filter(
    (item) => item.kind === "Folder" && !languageIds.has(item.name)
  )
  const pages = pageMap.filter((item) => item.kind === "MdxPage")

  return (
    <>
      {isLoaded && (
        <nav className={s.nav}>
          {pages.length > 0 && (
            <ul>
              {pages.map((item) => renderLink(item, item.route === route))}
            </ul>
          )}

          {otherFolders.length > 0 && (
            <ul>
              {otherFolders.map((item) =>
                item.children?.map(
                  (child) => child.kind === "MdxPage" && renderLink(child)
                )
              )}
            </ul>
          )}

          {languageFolders.length > 0 && (
            <ul>
              {languageFolders.map(
                (item) =>
                  item.name === language &&
                  item.children?.map(
                    (child) =>
                      child.kind === "MdxPage" &&
                      renderLink(child, child.route === route)
                  )
              )}
            </ul>
          )}
        </nav>
      )}
    </>
  )
}

export default Navigation
