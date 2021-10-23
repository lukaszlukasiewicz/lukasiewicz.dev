import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Styles from './PocketArticles.module.scss'
import { DefaultButton } from "components/UI/Button";
import { motion } from "framer-motion";
import AnimateInView from "components/AnimateInView/AnimateInView";
import useI18nContent from "hooks/useI18nContent";

const getArticleVariants = (index: number) => {
  return {
    visible: { y: 0, opacity: 1, transition: { type: "spring", delay: .5 + index * .3 } },
    hidden: { y: "2em", opacity: 0 }
  }
}

const buttonVariants = (index: number) => {
  return {
    visible: { x: 0, opacity: 1, transition: { type: "spring", delay: 1 + index * .3 } },
    hidden: { x: "2em", opacity: 0 }
  }
}


const trimTitle = (title: string) => {
  let titleArr = title.split(" ")
  if (titleArr.length > 8) {
    titleArr = titleArr.slice(0, 6)
    titleArr.push('...')
  }
  return titleArr.join(" ")
}


const localeContent = {
  en: {
    read: "Read"
  },
  pl: {
    read: "Czytaj"
  }
}

const PocketArticles = () => {
  const { locale } = useRouter();
  const { read } = useI18nContent(localeContent)
  const [articles, setArticles] = useState<{ [key: string]: any }[] | null>([])
  useEffect(() => {
    fetch('/api/pocket')
      .then(response => response.json())
      .then(json => setArticles(json.posts))
  }, [locale])


  return <AnimateInView className={Styles.PocketArticles}>
    {articles && articles.map((article, index) => {
      const { item_id: id, top_image_url: image, resolved_url: url, resolved_title: title, excerpt } = article
      return <motion.div variants={getArticleVariants(index)} key={id}>
        <div>
          <h3>{trimTitle(title)}</h3>
          <p>{excerpt}</p>
        </div>
        <motion.div variants={buttonVariants(index)}>
          <DefaultButton href={url} data-cursor="link;var(--page-background-color);var(--page-color)">{read}</DefaultButton>
        </motion.div>
      </motion.div>
    })}
  </AnimateInView>
}

export default PocketArticles