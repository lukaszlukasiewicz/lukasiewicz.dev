type Locales = {
  en: string,
  pl: string
}

type Page = {
  path: string,
  color: string,
  backgroundColor: string,
  primaryColor: string,
  primaryBackgroundColor?: string
  name: Locales
  inMenu: Boolean
}

type Pages = {
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
    color: "#222222",
    backgroundColor: "#00DFFC",
    primaryColor: "#E4F5B1",
    inMenu: true,
  },
  contact: {
    path: "/contact",
    name: {
      en: "Contact",
      pl: "Kontakt",
    },
    color: "#222222",
    backgroundColor: "#f3f3f3",
    primaryColor: "#F9D423",
    inMenu: true,
  },
}