import { useRouter } from "next/router"

type locales = "pl" | "en"
type localeContentType = { [key in locales]: any }

const useI18nContent = (localeContent: localeContentType) => {
  const { locale } = useRouter();
  const currentLocale = (locale ?? "en") as locales
  return localeContent[currentLocale]
}

export default useI18nContent