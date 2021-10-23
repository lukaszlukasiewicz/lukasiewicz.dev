import React, { useEffect, useState } from "react"
import Reveal from "components/UI/Reveal";
import Styles from "./SpotifyTracks.module.scss"
import { motion, useAnimation } from "framer-motion";
import { FaSpotify } from "react-icons/fa"

const hoverVariants = {
  hover: { scale: 1.45, transition: { type: "spring", delay: .15 } },
  rest: { scale: 0, },
}

const hoverVariants2 = {
  hover: { scale: 1.45, transition: { type: "spring" } },
  rest: { scale: 0, },
}

const titleVariants = {
  hover: { y: 0, opacity: 1, transition: { delay: .5 } },
  rest: { y: ".5em", opacity: 0, transition: { type: "tween" } }
}
const artistVariants = {
  hover: { y: 0, opacity: 1, transition: { delay: .3 } },
  rest: { y: "-1em", opacity: 0, transition: { type: "tween" } }
}

const spotifyVariants = {
  hover: { y: 0, opacity: 1, transition: { delay: .8 } },
  rest: { y: "1em", opacity: 0, transition: { type: "tween" } }
}

const Track = ({ track }: { [key: string]: any }) => {
  const controls = useAnimation();
  let variant = "rest"
  const handleOver = () => {
    if (variant == "hover") return
    variant = "hover"
    controls.start(variant)
  }
  const handleLeave = () => {
    if (variant == "rest") return
    variant = "rest"
    controls.start(variant)
  }
  return <a onMouseOver={handleOver} data-cursor="link" onMouseLeave={handleLeave} href={track.url} className={Styles.SpotifyTracks__link}>
    <Reveal color="#1ed760">
      <motion.div variants={hoverVariants2} initial="rest" className={Styles.SpotifyTracks__cover} animate={controls}></motion.div>
      <motion.div variants={hoverVariants} initial="rest" className={Styles.SpotifyTracks__cover2} animate={controls}></motion.div>
      <div className={Styles.SpotifyTracks_TrackInfo}>
        <div>
          <motion.h4 variants={artistVariants} initial="rest" animate={controls}>
            {track.artist}
          </motion.h4>
          <motion.h3 variants={titleVariants} initial="rest" animate={controls}>
            {track.title}
          </motion.h3>
          <motion.p variants={spotifyVariants} initial="rest" animate={controls}>
            Listen on <FaSpotify color="#fff" className={Styles.SpotifyTracks_Icon} />
          </motion.p>
        </div>
      </div>
      < img src={track.covers.url} loading="lazy" alt={track.album} />
    </Reveal>
  </a>
}

const SpotifyTracks = () => {
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    fetch('/api/spotify')
      .then(res => res.json())
      .then(json => setTracks(json.tracks))
  }, [])

  return <div className={Styles.SpotifyTracks}>
    {tracks.map((track: any) => {
      return <Track key={track.title} track={track} />
    })}
  </div>
}

export default SpotifyTracks
