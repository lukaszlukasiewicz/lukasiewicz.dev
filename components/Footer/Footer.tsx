import usePageConfig from "hooks/usePageConfig"
import { Logo } from "components/Menu/Menu"
import Styles from "./Footer.module.scss"
import { pages as pagesConfig } from 'config/pages'
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"

const Footer = () => {

  const { pathname, locale, locales } = useRouter()
  const currentPage = useRef(pathname.replace("/", ""))
  const page = usePageConfig(currentPage.current)
  const { backgroundColor, color, primaryColor } = page;
  const currentLocale = (locale ?? "en") as keyof typeof page.name
  const pages = Object.values(pagesConfig)
  return <>
    <style>
      {`.${Styles.Footer} {
        --page-color: ${color};
        --page-background-color: ${backgroundColor};
        --page-primary-color: ${primaryColor};
      }`}
    </style>
    <div className={Styles.Footer} style={{ backgroundColor: color }}>
      <div>
        <div>
          <Link scroll={false} href="/">
            <a style={{ fontSize: "1em", fontWeight: 400 }}><Logo />.dev</a>
          </Link>
        </div>
        <div className={Styles.HR}></div>
        {pages.filter(entry => !!entry.inMenu).map(entry => {
          const { path, name } = entry
          const isActive = pathname === path
          return <Link scroll={false} href={path} key={name[currentLocale]}>
            <a className={`${Styles['Menu__link']} ${isActive && Styles['Menu__link--active']}`}>{name[currentLocale]}</a>
          </Link>
        })}
      </div>
    </div>
  </>
}

export default Footer

