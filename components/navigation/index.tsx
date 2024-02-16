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

  const languageFolders = pageMap.filter(
    (item) => item.kind === "Folder" && languageIds.has(item.name)
  )
  const otherFolders = pageMap.filter(
    (item) => item.kind === "Folder" && !languageIds.has(item.name)
  )
  const pages = pageMap.filter((item) => item.kind === "MdxPage")

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

  const Folder = ({ folder, isLanguageFolder = false }) => {
    if (isLanguageFolder && folder.name !== language) {
      return null
    }

    return (
      <div key={folder.name} className={s.folder}>
        {folder.children?.map((child) => {
          if (child.kind === "MdxPage") {
            return <Page page={child} />
          } else if (child.kind === "Folder") {
            return <Folder folder={child} />
          }
          return null
        })}
      </div>
    )
  }

  const Page = ({ page }) => renderLink(page, page.route === route)

  return (
    <>
      {isLoaded && (
        <nav className={s.nav}>
          {pages.length > 0 && (
            <div>
              {pages.map((page) => (
                <Page page={page} />
              ))}
            </div>
          )}

          {otherFolders.length > 0 && (
            <div>
              {otherFolders.map((folder) => (
                <Folder folder={folder} />
              ))}
            </div>
          )}

          {languageFolders.length > 0 && (
            <div>
              {languageFolders.map((folder) => (
                <Folder folder={folder} isLanguageFolder={true} />
              ))}
            </div>
          )}
        </nav>
      )}
    </>
  )
}

export default Navigation
