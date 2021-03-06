import Styles from './PocketArticles.module.scss'
import { DefaultButton } from "components/UI/Button";
import { motion } from "framer-motion";
import AnimateInView from "components/AnimateInView/AnimateInView";
import useI18nContent from "hooks/useI18nContent";
import trimString from 'utils/trimString';

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

const localeContent = {
  en: {
    read: "Read"
  },
  pl: {
    read: "Czytaj"
  }
}

type PocketArticlesProps = {
  articles?: []
}

const PocketArticles = ({ articles = [] }: PocketArticlesProps) => {
  const { read } = useI18nContent(localeContent)


  return <AnimateInView className={Styles.PocketArticles}>
    {articles && articles.map((article, index) => {
      const { item_id: id, top_image_url: image, resolved_url: url, resolved_title: title, excerpt } = article
      return <motion.div variants={getArticleVariants(index)} key={id}>
        <div>
          <h3>{trimString(title)}</h3>
          <p>{trimString(excerpt, 140)}</p>
        </div>
        <motion.div variants={buttonVariants(index)}>
          <DefaultButton href={url} data-cursor="link;var(--page-background-color);var(--page-color)">{read}</DefaultButton>
        </motion.div>
      </motion.div>
    })}
  </AnimateInView>
}

export default PocketArticles