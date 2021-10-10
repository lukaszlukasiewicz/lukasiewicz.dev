import { useRouter } from "next/router"
import { useEffect } from "react"

const BodyClass = ({className}) => {
  const {locale} = useRouter()
  useEffect(() => {
    const body = document.querySelector('body')
    const clases = className.split(" ")
    clases.push(`locale-${locale}`)
    body.classList.add(...clases)
    return () => {
      body.classList.remove(...clases)
    }
  },[className, locale])
  return <></>
}

export default BodyClass