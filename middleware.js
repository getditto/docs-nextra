import { NextResponse } from "next/server"
import languagesData from "./components/language/languages"

export function middleware(request) {
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

    return NextResponse.redirect(new URL(newPathname, request.url))
  }

  return NextResponse.next()
}
