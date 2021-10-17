import Styles from './Button.module.scss'

type ButtonProps = {
  color?: string,
  backgroundColor?: string,
  buttonSize?: string,
  type?: "button" | "submit" | "reset",
  className?: string,
  href?: string,
}


export const Button: React.FC<ButtonProps> = ({ children, className, type, href, color = "", buttonSize, backgroundColor = "", ...rest }) => {

  if (href) return <a href={href} className={[Styles.Button, buttonSize && Styles['Button__' + buttonSize], className].join(" ")} {...rest} style={{ color, backgroundColor }}>
    {children}
  </a>
  return <button type={type} className={[Styles.Button, buttonSize && Styles['Button__' + buttonSize], className].join(" ")} {...rest} style={{ color, backgroundColor }}>
    {children}
  </button>
}


export const DefaultButton: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return <Button className={[Styles.Button__default, className].join(" ")} {...rest}>
    {children}
  </Button>
}


export const NegativeButton: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return <Button className={[Styles.Button__negative, className].join(" ")} {...rest}>
    {children}
  </Button>
}

export const PrimaryButton: React.FC<ButtonProps> = ({ children, className = "", ...rest }) => {
  return <Button className={[Styles.Button__primary, className].join(" ")} {...rest}>
    {children}
  </Button>
}

