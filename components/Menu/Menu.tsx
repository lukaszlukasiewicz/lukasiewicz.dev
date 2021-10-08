import Link from 'next/link'
import { useRouter } from 'next/router'

import Styles from './Menu.module.scss'
import { pages as pagesConfig } from 'config/pages'
import usePageConfig from 'hooks/usePageConfig'

const Menu = () => {
  const { pathname, locale, locales } = useRouter()
  const pages = Object.values(pagesConfig);
  const currentPage = usePageConfig()
  const currentLocale = (locale ?? "en") as keyof typeof currentPage.name
  return <nav className={Styles.Menu}>
    <div style={{ color: currentPage?.color, borderBottomColor: currentPage?.color + "22" }}>
      <div className={Styles.Menu__link}>
        <Link scroll={false} href="/">
          <a>lukasiewicz.dev</a>
        </Link>
      </div>
      {pages.filter(entry => !!entry.inMenu).map(entry => {
        const { path, name } = entry
        const isActive = pathname === path
        return <Link scroll={false} href={path} key={name[currentLocale]}>
          <a className={`${Styles['Menu__link']} ${isActive && Styles['Menu__link--active']}`}>{name[currentLocale]}</a>
        </Link>
      })}
      {locales?.filter(lc => lc != locale).map(lc => <Link href={pathname} key={lc} locale={lc}>
        <a className={`${Styles.Menu__link} ${Styles.Menu__locale}`}>{lc}</a>
      </Link>)}
    </div>
  </nav>
}

export default Menu