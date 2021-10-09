import usePageConfig from "hooks/usePageConfig"
import { useEffect, useMemo, useRef } from "react"
import Styles from './Button.module.scss'
import { Page } from "config/pages"

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
  const page = useRef(usePageConfig());
  const { color, backgroundColor } = page.current;
  return <Button color={backgroundColor} backgroundColor={color} {...rest}>
    {children}
  </Button>
}


export const NegativeButton: React.FC<React.HTMLProps<HTMLButtonElement> & ButtonProps> = ({ children, ...rest }) => {
  const page = useRef(usePageConfig());
  const { color, backgroundColor } = page.current;
  return <Button color={color} backgroundColor={backgroundColor} {...rest}>
    {children}
  </Button>
}

export const PrimaryButton: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = ({ children, ...rest }) => {
  const page = useRef(usePageConfig());
  const { primaryColor, primaryBackgroundColor } = page.current;
  return <Button color={primaryBackgroundColor} backgroundColor={primaryBackgroundColor ?? primaryColor} {...rest}>
    {children}
  </Button>
}

