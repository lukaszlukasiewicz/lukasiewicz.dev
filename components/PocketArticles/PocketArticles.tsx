import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Styles from './PocketArticles.module.scss'
import { DefaultButton, NegativeButton, PrimaryButton } from "components/UI/Button";
import { motion, useAnimation } from "framer-motion";
import useIntersectionObserver from "hooks/useIntersectionObserver";

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

const PocketArticles = () => {
  const { locale } = useRouter();
  const controls = useAnimation();
  const [observe, unobserve] = useIntersectionObserver()
  const ref = useRef(null)
  const [articles, setArticles] = useState<{ [key: string]: any }[] | null>([])
  useEffect(() => {
    fetch('/api/pocket')
      .then(response => response.json())
      .then(json => setArticles(json.posts))
  }, [locale])

  useEffect(() => {
    const { current } = ref
    if (current) observe(current, () => { controls.start("visible") }, (entry: IntersectionObserverEntry) => { console.log(entry); if (entry.boundingClientRect.top > 0) controls.start("hidden") })
    return () => {
      if (current) unobserve(current)
    }
  }, [observe, unobserve, controls])

  return <div ref={ref} className={Styles.PocketArticles}>
    {articles && articles.map((article, index) => {
      const { item_id: id, top_image_url: image, resolved_url: url, resolved_title: title, excerpt } = article
      return <motion.div variants={getArticleVariants(index)} animate={controls} key={id}>
        <div>
          <h3>{trimTitle(title)}</h3>
          <p>{excerpt}</p>
        </div>
        <motion.div variants={buttonVariants(index)}>
          <DefaultButton href={url}>Read</DefaultButton>
        </motion.div>
      </motion.div>
    })}
  </div>
}

export default PocketArticles