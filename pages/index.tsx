import type { NextPage } from 'next'
import Head from 'next/head'
import Header from 'components/Header/Header'
import AnimatedHeader from 'components/AnimatedHeader/AnimatedHeader'
import usePageConfig from 'hooks/usePageConfig'

const Home: NextPage = () => {
  const page = usePageConfig()
  return (
    <>
      <Head>
        <title>Lukasiewicz.dev</title>
      </Head>
      <Header style={{
        backgroundColor: page.backgroundColor,
        color: page.color, minHeight: "100vh"
      }}>
        <AnimatedHeader initial="hidden" animate="visible" split="letter">Hi ;)</AnimatedHeader>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet dolorum quia, molestiae dolores iusto accusantium ipsa illum fugit hic at veritatis repellendus eum placeat perferendis nesciunt ipsam ullam, error odio!</p>
      </Header>
    </>

  )
}

export default Home
