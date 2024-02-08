const withNextra = require("nextra")({
  theme: "./theme.tsx",
  themeConfig: "./theme.config.tsx",
})

module.exports = withNextra()
