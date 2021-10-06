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

export const SubHeader: React.FC = ({ children }) => {

  const page = usePageConfig();
  return <p className={Styles.SubHeader}>
    <span style={{ background: page.primaryColor, borderColor: page.primaryColor }}>
      {children}
    </span>
  </p >
}

export default Header