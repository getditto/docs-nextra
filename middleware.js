import { NextResponse } from "next/server"
import languagesData from "./components/language/languages"

export const middleware = async (request) => {
  const supportedLanguages = new Set(
    languagesData.map((language) => language.id)
  )
  const { value: cookieLanguage } = request.cookies.get("language") || {}

  if (!cookieLanguage) {
    return NextResponse.next()
  }

  const url = new URL(request.nextUrl)
  const pathParts = url.pathname.split("/")
  const currentLanguage = pathParts[1]

  if (
    currentLanguage !== cookieLanguage &&
    supportedLanguages.has(currentLanguage)
  ) {
    pathParts[1] = cookieLanguage
    const newPathname = pathParts.join("/")
    const newUrl = new URL(newPathname, request.url)
    const homeUrl = new URL("/", request.url)

    try {
      const response = await fetch(newUrl, { method: "HEAD" })
      if (response.status !== 404) {
        return NextResponse.redirect(newUrl)
      } else {
        return NextResponse.redirect(homeUrl)
      }
    } catch (error) {
      return NextResponse.redirect(homeUrl)
    }
  }

  return NextResponse.next()
}
