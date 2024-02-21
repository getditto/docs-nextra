import { useContext, useEffect, useState, useMemo } from "react"
import { Link } from "nextra-theme-docs"
import * as Accordion from "@radix-ui/react-accordion"
import languagesData from "../language/languages"
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
    <Accordion.Root type="single" collapsible>
      <Accordion.Item value="item-1" className={s.folder}>
        <Accordion.Trigger className={s.folderTitle}>
          <span>{folder.name}</span>
          <svg
            fill="none"
            stroke="currentColor"
            className={s.chevron}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m9 5 7 7-7 7"
              className="nx-origin-center nx-transition-transform rtl:-nx-rotate-180"
            />
          </svg>
        </Accordion.Trigger>
        <Accordion.Content className={s.folderContent}>
          {folder.children?.map((child, index) => {
            if (child.kind === "MdxPage") {
              return (
                <Page page={child} route={route} key={index + child.name} />
              )
            } else if (child.kind === "Folder") {
              return (
                <Folder
                  folder={child}
                  language={language}
                  route={route}
                  key={index + child.name}
                />
              )
            }
            return null
          })}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
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
              {pages.map((page, index) => (
                <Page page={page} route={route} key={index + page.name} />
              ))}
            </div>
          )}

          {otherFolders.length > 0 && (
            <div>
              {otherFolders.map((folder, index) => (
                <Folder
                  folder={folder}
                  language={language}
                  route={route}
                  key={index + folder.name}
                />
              ))}
            </div>
          )}

          {languageFolders.length > 0 && (
            <div>
              {languageFolders.map((folder, index) => (
                <Folder
                  folder={folder}
                  isLanguageFolder={true}
                  language={language}
                  route={route}
                  key={index + folder.name}
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
