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
  console.log(track);
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
  return <a onMouseOver={handleOver} onMouseLeave={handleLeave} href={track.url} className={Styles.SpotifyTracks__link}>
    <Reveal color="#1ed760">
      <motion.div variants={hoverVariants2} initial="rest" animate={controls} style={{
        mixBlendMode: "multiply", position: "absolute", top: 0, left: 0, width: "100% ", height: "100% ", backgroundColor: "#1ed760", borderRadius: "100% "
      }}></motion.div>
      <motion.div variants={hoverVariants} initial="rest" animate={controls} style={{
        position: "absolute", top: 0, left: 0, width: "100% ", height: "100% ", backgroundColor: "#1ed760", borderRadius: "100% "
      }}></motion.div>
      <div style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, display: "grid", alignItems: "center" }}>
        <div style={{ padding: "1em" }}>
          <motion.h4 variants={artistVariants} initial="rest" animate={controls} style={{ margin: 0, color: "#fff", fontSize: "1.5em", textAlign: "center", fontWeight: 400 }}>{track.artist}</motion.h4>
          <motion.h3 variants={titleVariants} initial="rest" animate={controls} style={{ margin: 0, color: "#fff", fontSize: "3em", textAlign: "center", fontWeight: 400 }}>{track.title}</motion.h3>
          <motion.p variants={spotifyVariants} initial="rest" animate={controls} style={{ margin: "1em 0 0 0", color: "#fff", textAlign: "center", fontSize: "1.5em", fontWeight: 400 }}>Listen on <FaSpotify color="#fff" style={{ verticalAlign: "middle", fontSize: "1.5em" }} /></motion.p>
        </div>
      </div>
      < img src={track.covers.url} alt={track.album} />
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



  return <div data-cursor="test" className={Styles.SpotifyTracks}>
    {tracks.map((track: any) => {
      return <Track key={track.title} track={track} />
    })}
  </div>
}

export default SpotifyTracks
