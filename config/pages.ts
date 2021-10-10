export type Locales = {
  en: string,
  pl: string
}

export type Page = {
  path: string,
  color: string,
  backgroundColor: string,
  primaryColor: string,
  primaryBackgroundColor?: string
  name: Locales
  inMenu: Boolean
}

export type Pages = {
  [key: string]: Page
}

export const pages: Pages = {
  home: {
    path: "/",
    color: "#FE4365",
    backgroundColor: "#111625",
    primaryColor: "#F9D423",
    name: {
      en: "Home",
      pl: "Home",
    },
    inMenu: false,
  },
  about: {
    path: "/about",
    name: {
      en: "About",
      pl: "O mnie",
    },
    color: "#111625",
    backgroundColor: "#FE4365",
    primaryColor: "#E4F5B1",
    inMenu: true,
  },
  contact: {
    path: "/contact",
    name: {
      en: "Contact",
      pl: "Kontakt",
    },
    color: "#111625",
    backgroundColor: "#F0F2EB",
    primaryColor: "#F9D423",
    inMenu: true,
  },
}