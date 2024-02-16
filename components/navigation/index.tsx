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

  useEffect(() => {
    if (language !== undefined) {
      setIsLoaded(true)
    }
  }, [language])

  return (
    <>
      {isLoaded && (
        <nav className={s.nav}>
          {pageMap.map((item) => {
            if (item.kind === "MdxPage") {
              return (
                <Link
                  key={item.name}
                  href={item.route}
                  className={`${s.link} ${item.route === route && s.active}`}
                >
                  {item.name}
                </Link>
              )
            }

            // languages folders
            else if (
              item.kind === "Folder" &&
              languagesData.map((lang) => lang.id).includes(item.name) &&
              item.name === language
            ) {
              return (
                item.children &&
                item.children.map(
                  (child) =>
                    child.kind === "MdxPage" && (
                      <Link
                        key={child.name}
                        href={child.route}
                        className={`${s.link} ${
                          child.route === route && s.active
                        }`}
                      >
                        {child.name}
                      </Link>
                    )
                )
              )
            }

            // other folders
            else if (
              item.kind === "Folder" &&
              !languagesData.map((lang) => lang.id).includes(item.name)
            ) {
              return (
                item.children &&
                item.children.map(
                  (child) =>
                    child.kind === "MdxPage" && (
                      <Link
                        key={child.name}
                        href={child.route}
                        className={s.link}
                      >
                        {child.name}
                      </Link>
                    )
                )
              )
            }

            return null
          })}
        </nav>
      )}
    </>
  )
}

export default Navigation
