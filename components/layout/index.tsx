import Link from "next/link"
import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import LanguageContext from "../language/context"
import s from "./layout.module.css"
import LanguageSelector from "../language/selector"
import languagesData from "../language/languages"

const Layout = ({ children, pageOpts }) => {
  const { title, frontMatter, headings, pageMap } = pageOpts
  const { language } = useContext(LanguageContext)
  const [isLoaded, setIsLoaded] = useState(false)

  // Copilot added this because of hydration issues
  useEffect(() => {
    if (language !== undefined) {
      setIsLoaded(true)
    }
  }, [language])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:image" content={frontMatter.image} />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={s.main}>
        <header className={s.header}>
          <Link href="/" className={s.logo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 102 24"
              height={20}
            >
              <path
                fill="currentColor"
                d="M92.658 24c-5.654 0-9.342-3.593-9.342-9s3.688-9 9.342-9C98.31 6 102 9.593 102 15c0 5.44-3.689 9-9.342 9Zm0-4.2c2.561 0 4.52-1.823 4.52-4.8s-2.072-4.8-4.52-4.8c-2.449 0-4.52 1.823-4.52 4.8s1.958 4.8 4.52 4.8Zm-31.643-2.073V.6h4.822v6h4.219v4.2h-4.22l-.005 6.34c0 1.242.033 2.06 1.28 2.06h3.547v4.2h-3.715c-3.397 0-5.928-2.292-5.928-5.673Zm11.452 0V.6h4.821v6h4.22v4.2h-4.22l-.006 6.34c0 1.242.034 2.06 1.281 2.06h3.547v4.2h-3.716c-3.396 0-5.927-2.292-5.927-5.673ZM45.202.6h4.813v22.8h-4.219v-1.913C44.618 23.005 42.936 24 40.372 24c-4.783.034-9.041-3.377-9.041-9 0-5.486 3.917-9 9.04-9 1.809 0 3.805.562 4.822 1.837L45.203.6Zm-4.454 19.2c2.669 0 4.445-1.799 4.445-4.8 0-3.036-2.297-4.838-4.256-4.838-2.669 0-4.784 1.802-4.784 4.838s1.927 4.8 4.595 4.8ZM57.926 7.2h-4.822v16.2h4.822V7.2ZM55.532 0c1.573 0 2.77 1.12 2.77 2.683 0 1.562-1.197 2.717-2.77 2.717-1.607 0-2.805-1.155-2.805-2.717S53.925 0 55.532 0ZM25.994 11.808 19.184.402A.515.515 0 0 0 18.74.15h-6.948a.518.518 0 0 0-.442.785l6.492 10.873a.521.521 0 0 1 0 .534L11.35 23.214a.519.519 0 0 0 .442.786h6.948a.515.515 0 0 0 .442-.252l6.811-11.406a.521.521 0 0 0 0-.534Z"
              />
              <path
                fill="currentColor"
                d="M14.718 11.808 7.907.402A.515.515 0 0 0 7.465.15H.516c-.4 0-.648.44-.442.785l6.492 10.873a.521.521 0 0 1 0 .534L.074 23.214A.519.519 0 0 0 .516 24h6.949a.515.515 0 0 0 .442-.252l6.81-11.406a.521.521 0 0 0 0-.534Z"
              />
            </svg>
          </Link>
          <LanguageSelector />
        </header>

        {headings.length > 0 && (
          <ul className={s.table}>
            {headings.map((heading) => (
              <li key={heading.value}>{heading.value}</li>
            ))}
          </ul>
        )}

        {isLoaded && (
          <nav className={s.nav}>
            {pageMap.map((item) => {
              if (item.kind === "MdxPage") {
                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className={`${s.link} ${
                      item.route === pageOpts.route && s.active
                    }`}
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
                            child.route === pageOpts.route && s.active
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

        <div className={s.content}>{children}</div>

        <footer className={s.footer}>
          <p>© 2024 DittoLive Inc. All rights reserved</p>
        </footer>
      </main>
    </>
  )
}

export default Layout
