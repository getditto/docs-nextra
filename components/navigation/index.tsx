import { Link } from "nextra-theme-docs"
import languagesData from "../language/languages"
import { useContext, useEffect, useState, useMemo } from "react"
import LanguageContext from "../language/context"

import s from "./navigation.module.css"

type NavigationProps = {
  pageMap: any
  route: any
}

const renderLink = (item, active = false) => (
  <Link
    key={item.name}
    href={item.route}
    className={`${s.link} ${active && s.active}`}
  >
    {item.name}
  </Link>
)

const Folder = ({ folder, isLanguageFolder = false, language, route }) => {
  if (isLanguageFolder && folder.name !== language) {
    return null
  }

  return (
    <div key={folder.name} className={s.folder}>
      {folder.children?.map((child) => {
        if (child.kind === "MdxPage") {
          return <Page page={child} route={route} />
        } else if (child.kind === "Folder") {
          return <Folder folder={child} language={language} route={route} />
        }
        return null
      })}
    </div>
  )
}

const Page = ({ page, route }) => renderLink(page, page.route === route)

const Navigation = ({ pageMap, route }: NavigationProps) => {
  const { language } = useContext(LanguageContext)
  const [isLoaded, setIsLoaded] = useState(false)
  const languageIds = useMemo(
    () => new Set(languagesData.map((lang) => lang.id)),
    []
  )

  const languageFolders = useMemo(
    () =>
      pageMap.filter(
        (item) => item.kind === "Folder" && languageIds.has(item.name)
      ),
    [pageMap, languageIds]
  )

  const otherFolders = useMemo(
    () =>
      pageMap.filter(
        (item) => item.kind === "Folder" && !languageIds.has(item.name)
      ),
    [pageMap, languageIds]
  )

  const pages = useMemo(
    () => pageMap.filter((item) => item.kind === "MdxPage"),
    [pageMap]
  )

  useEffect(() => {
    if (language !== undefined) {
      setIsLoaded(true)
    }
  }, [language])

  return (
    <>
      {isLoaded && (
        <nav className={s.nav}>
          {pages.length > 0 && (
            <div>
              {pages.map((page) => (
                <Page page={page} route={route} />
              ))}
            </div>
          )}

          {otherFolders.length > 0 && (
            <div>
              {otherFolders.map((folder) => (
                <Folder folder={folder} language={language} route={route} />
              ))}
            </div>
          )}

          {languageFolders.length > 0 && (
            <div>
              {languageFolders.map((folder) => (
                <Folder
                  folder={folder}
                  isLanguageFolder={true}
                  language={language}
                  route={route}
                />
              ))}
            </div>
          )}
        </nav>
      )}
    </>
  )
}

export default Navigation
