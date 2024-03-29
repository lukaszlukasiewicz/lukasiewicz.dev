import usePageConfig from "hooks/usePageConfig"
import { Logo } from "components/Menu/Menu"
import Styles from "./Footer.module.scss"
import { pages as pagesConfig } from 'config/pages'
import Link from "next/link"
import { useRouter } from "next/router"
import { useRef } from "react"

const Footer = () => {

  const { pathname, locale } = useRouter()
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
    <div className={Styles.Footer}>
      <div>
        <div className={Styles.Footer__logo}>
          <Link scroll={false} href="/">
            <Logo />.dev
          </Link>
        </div>
        <div className={Styles.HR}></div>
        {pages.filter(entry => !!entry.inMenu).map(entry => {
          const { path, name } = entry
          const isActive = pathname === path
          return <Link scroll={false} href={path} key={name[currentLocale]} className={`${Styles['Menu__link']} ${isActive && Styles['Menu__link--active']}`}>
            {name[currentLocale]}
          </Link>
        })}
      </div>
    </div>
  </>
}

export default Footer

