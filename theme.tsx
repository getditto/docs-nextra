import type { NextraThemeLayoutProps } from "nextra"
import LanguageProvider from "./components/language/provider"
import Layout from "./components/layout"

const Theme = ({ children, pageOpts }: NextraThemeLayoutProps) => {
  return (
    <LanguageProvider>
      <Layout pageOpts={pageOpts}>{children}</Layout>
    </LanguageProvider>
  )
}

export default Theme
