import Styles from './Header.module.scss'
import usePageConfig from "hooks/usePageConfig"


type HeaderProps = {
  style?: React.CSSProperties
}

const Header: React.FC<HeaderProps> = ({ children, style }) => {
  return <div className={Styles.Header} style={style}>
    <div>
      {children}
    </div>
  </div>
}
type SubHeaderProps = {
  pageId?: string
}
export const SubHeader: React.FC<SubHeaderProps> = ({ children, pageId = "" }) => {

  const page = usePageConfig(pageId);
  return <p className={Styles.SubHeader}>
    <span style={{ background: page.primaryColor, borderColor: page.primaryColor }}>
      {children}
    </span>
  </p >
}

export default Header