import usePageConfig from "hooks/usePageConfig"
import Styles from './Button.module.scss'

type ButtonProps = {
  color?: string,
  backgroundColor?: string,
  buttonSize: string,
}

export const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({ children, type, color = "#000", buttonSize, backgroundColor = "#444", ...rest }) => {
  return <button className={`${Styles.Button} ${buttonSize && Styles['Button__' + buttonSize]}`} {...rest} style={{ color, backgroundColor }}>
    {children}
  </button>
}


export const DefaultButton: React.FC<React.HTMLProps<HTMLButtonElement> & ButtonProps> = ({ children, ...rest }) => {
  const page = usePageConfig()
  return <Button color={page.backgroundColor} backgroundColor={page.color} {...rest}>
    {children}
  </Button>
}


export const NegativeButton: React.FC<React.HTMLProps<HTMLButtonElement> & ButtonProps> = ({ children, ...rest }) => {
  const page = usePageConfig()
  return <Button color={page.color} backgroundColor={page.backgroundColor} {...rest}>
    {children}
  </Button>
}

export const PrimaryButton: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({ children, ...rest }) => {
  const page = usePageConfig()
  return <Button color={page.primaryBackgroundColor} backgroundColor={page.primaryBackgroundColor ?? page.primaryColor} {...rest}>
    {children}
  </Button>
}

