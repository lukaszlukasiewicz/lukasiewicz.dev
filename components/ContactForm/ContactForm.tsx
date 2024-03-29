import { PrimaryButton } from "components/UI/Button"
import { useRouter } from "next/router"
import React, { FormEvent, useState } from "react"
import Styles from "./ContactForm.module.scss"
import { AnimatePresence, motion } from "framer-motion"
import useI18nContent from "hooks/useI18nContent"

const headerVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring" } },
  hidden: { y: "-2em", opacity: 0 }
}

const formVariants = {
  visible: { y: 0, opacity: 1, transition: { type: "spring" } },
  hidden: { y: "2em", opacity: 0 }
}

const buttonVariants = {
  visible: { x: 0, opacity: 1, transition: { type: "spring", delay: 1 } },
  hidden: { x: "2em", opacity: 0 }
}


const localeContent = {
  en: {
    contactFormHeader: "Contact form",
    submit: "Send",
    sendingText: "Sending ...",
    sentHeader: "Your message has been sent",
    sentText: "I will get back to you as soon as I can. In the meantime, have a nice day",
    errorMsg: "There was an error sending your message, try again later",
  },
  pl: {
    contactFormHeader: "Formularz kontaktowy",
    submit: "Wyślij",
    sendingText: "Wysyłam ...",
    sentHeader: "Twoja wiadomość została wysłana",
    sentText: "Odezwę się tak szybko jak będę w stanie. W międzyczasie życzę miłego dnia",
    errorMsg: "Natriliśmy na błąd podczas wysyłania, spróbuj ponownie później",
  }
}

const FormPl = () => {
  return <>
    <span className={Styles.Nowrap} >
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>Cześć</div>
      <div style={{ width: "3.5em", textAlign: "center" }}>{"Mam na imię"} </div>
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}>{"=>"}</div>
    </span>
    <span className={Styles.Nowrap}>
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}> {"{"}</div>
      <input type="text" name="name" data-cursor="input" required className={Styles.ContactInput} placeholder="Twoje imię ..." />
      <div className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}>{"}"}</div>
    </span>
    <span className={Styles.Nowrap}>
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}> {"&&"}</div>
      <div style={{ width: "5em", textAlign: "center" }}>{" Mój adres e-mail"} </div>
      <div className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"==="}</div>
    </span>
    <span className={Styles.Nowrap}>
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"("}</span>
      <input type="email" data-cursor="input" name="email" required className={Styles.ContactInput} placeholder="Twój adres e-mail ..." />
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {")"} </span>
    </span>
    <span className={Styles.Nowrap}>
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>Chciał(a)bym</div>
    </span>
    <span className={Styles.Nowrap}>
      <div style={{ width: "4em", textAlign: "center" }}>{"pogadać"} <span className={Styles.Code} style={{ color: "var(--page-color)" }}>{"......"}</span> </div>
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"<=>"} </span>
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>{"o"}</div>
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}> {":"}</div>
    </span>
    <span className={Styles.Nowrap} style={{ width: "100%" }}>
      <textarea data-cursor="input" name="message" required className={Styles.ContactInput} placeholder="Twoja wiadomość ..." />
    </span>

  </>
}

const FormEn = () => {
  return <>
    <span className={Styles.Nowrap} >
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>HI!</div>
      <div style={{ width: "5em", textAlign: "center" }}>{" My (first) name is"} </div>
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}>{"=>"}</div>
    </span>
    <span className={Styles.Nowrap} >
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}> {"{"}</div>
      <input name="name" required type="text" data-cursor="input" className={Styles.ContactInput} placeholder="Your name ..." />
      <div className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}>{"}"}</div>
    </span>
    <span className={Styles.Nowrap} >
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}> {"&"}</div>
      <div style={{ width: "5em", textAlign: "center" }}>{"my e-mail addres is"} </div>
      <div className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"==="}</div>
    </span>
    <span className={Styles.Nowrap} >
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"("}</span>
      <input name="email" required type="email" data-cursor="input" className={Styles.ContactInput} placeholder="Your e-mail ..." />
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {")"} </span>
    </span>
    <span className={Styles.Nowrap} >
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>I Would</div>
      <div style={{ width: "4em", textAlign: "center" }}>{" like to talk"} </div>
    </span>
    <span className={Styles.Nowrap} >
      <span className={Styles.Code} style={{ fontSize: "3em", color: "var(--page-color)" }}> {"<=>"} </span>
      <div style={{ fontSize: "3em", color: "var(--page-color)" }}>{"About"}</div>
      <div className={Styles.Code} style={{ fontSize: "3em", whiteSpace: "nowrap", color: "var(--page-color)" }}> {":"}</div>
    </span>
    <span className={Styles.Nowrap} style={{ width: "100%" }}>
      <textarea name="message" data-cursor="input" required className={Styles.ContactInput} placeholder="Your message ..." />
    </span>
  </>
}

type formFields = {
  name: string,
  email: string,
  message: string,
}

const sendMail = async (submitedData: formFields) => {
  const response = await fetch('/api/contact', {
    method: "POST",
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(submitedData)
  })

  if (response.ok) return await response.json()

  return {
    error: true,
    message: `${response.status} ${response.statusText}`
  }
}

const ContactForm = () => {
  const { locale } = useRouter()
  const [mailSent, setMailSent] = useState(false)
  const [mailError, setMailError] = useState(false)
  const [sending, setSending] = useState(false)
  const { contactFormHeader, submit, sendingText, sentHeader, sentText, errorMsg } = useI18nContent(localeContent)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const isValid = form.checkValidity()
    if (!isValid) return false;
    const formData = new FormData(form)
    const submitedData = Object.fromEntries(formData.entries()) as formFields
    setSending(true)
    sendMail(submitedData)
      .then(data => {
        if (!data.error) {
          setMailSent(true)
          setMailError(false)
        }
        else setMailError(true)
      }).finally(() => {
        setSending(false)
      })
  }

  return <div className={[Styles.ContactWrapper, Styles[`ContactWrapper-${locale}`]].join(" ")}>
    <AnimatePresence mode="wait">
      {!mailSent && <motion.div variants={formVariants} initial="hidden" animate="visible" exit="hidden" key="form">
        <motion.h2 variants={headerVariants}>{contactFormHeader}</motion.h2>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={sending}>
            <div className={Styles.ContactForm}>
              {(locale == 'pl') ? <FormPl /> : <FormEn />}
            </div>
            {sending && <div className={Styles.ContactForm__loader}>
              <div><span></span>{sendingText}</div>
            </div>}
          </fieldset>
          {mailError && errorMsg}
          <motion.div variants={buttonVariants} style={{ fontSize: ".8em" }}>
            <PrimaryButton disabled={sending} data-cursor="mail" buttonSize="medium" type="submit">{submit}</PrimaryButton>
          </motion.div>
        </form>
      </motion.div>}
      {mailSent && <motion.div variants={formVariants} initial="hidden" animate="visible" exit="hidden" key="thankyou">
        <h2>{sentHeader}</h2>
        <p>{sentText}</p>
      </motion.div>}
    </AnimatePresence>
  </div>
}

export default ContactForm