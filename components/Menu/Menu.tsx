import Link from 'next/link'
import { useRouter } from 'next/router'
import Styles from './Menu.module.scss'
import { pages as pagesConfig } from 'config/pages'
import usePageConfig from 'hooks/usePageConfig'


export const Logo = ({ fill = "" }: { fill?: string }) => {
  return <svg width="100%" height="100%" viewBox="0 0 60 60" version="1.1" style={{ display: "inline-block", width: "2em", height: "1.6em", margin: "-.4em 0 -.2em 0", verticalAlign: "middle" }}>
    <g transform="matrix(-0.967205,0,0,0.967205,58.0161,-0.173803)">
      <g transform="matrix(0.0386158,0,0,0.0386158,-10.6158,-8.35138)">
        <path d="M880.965,1219.91C866.558,1219.91 854.879,1208.23 854.879,1193.82C854.879,1099.36 854.879,768.609 854.879,537.446C854.878,406.995 749.127,301.244 618.677,301.244C618.664,301.244 618.652,301.244 618.639,301.244C488.189,301.244 382.438,406.995 382.438,537.445C382.438,789.858 382.438,1188.24 382.438,1444.9C382.438,1510.52 408.508,1573.46 454.914,1619.87C501.321,1666.28 564.261,1692.35 629.889,1692.35L1484.94,1692.35C1615.39,1692.35 1721.15,1586.6 1721.15,1456.14C1721.15,1456.13 1721.15,1456.12 1721.15,1456.11C1721.15,1325.66 1615.39,1219.91 1484.94,1219.91C1269.01,1219.91 970.102,1219.91 880.965,1219.91Z" style={{ fill }} />
      </g>
      <g transform="matrix(0.0375124,0,0,0.0375124,-7.10553,-10.1792)">
        <path d="M1654.39,742.227C1654.39,654.012 1619.35,569.41 1556.97,507.032C1494.59,444.655 1409.99,409.611 1321.77,409.611C1321.77,409.611 1321.77,409.611 1321.77,409.611C1233.56,409.611 1148.95,444.655 1086.58,507.032C1024.2,569.41 989.155,654.012 989.155,742.227C989.155,856.349 989.155,970.472 989.155,1030.86C989.155,1055.15 1008.85,1074.85 1033.14,1074.85C1093.53,1074.85 1207.65,1074.85 1321.77,1074.85C1409.99,1074.85 1494.59,1039.8 1556.97,977.424C1619.35,915.046 1654.39,830.444 1654.39,742.229C1654.39,742.228 1654.39,742.228 1654.39,742.227Z" style={{ fill }} />
      </g>
    </g>
  </svg>
}

const Menu = () => {
  const { pathname, locale, locales } = useRouter()
  const pages = Object.values(pagesConfig);
  const currentPage = usePageConfig()
  const currentLocale = (locale ?? "en") as keyof typeof currentPage.name
  return <nav className={Styles.Menu}>
    <style>
      {`.${Styles.Menu} {
        --page-color: ${currentPage.color};
        --page-background-color: ${currentPage.backgroundColor};
        --page-primary-color: ${currentPage.primaryColor};
      }`}
    </style>
    <div style={{ color: currentPage?.color, borderBottomColor: currentPage?.color + "22" }}>
      <div className={Styles.Menu__link}>
        <Link scroll={false} href="/">
          <a style={{ fontSize: "1em", fontWeight: 400 }}><Logo fill={currentPage.color} />.dev</a>
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