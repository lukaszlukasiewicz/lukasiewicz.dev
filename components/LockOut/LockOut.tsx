import React, { useEffect, useRef, useState } from "react"
import { FaRegKissWinkHeart } from "react-icons/fa"

const pass = "1234az"

const LockOut: React.FC = ({ children }) => {

  const [authorized, authorize] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value == pass) authorize(true)
  }

  const handleClick = (e: React.MouseEvent) => {
    e.currentTarget.querySelector("input")?.focus();
  }

  return <>{authorized ? children : <div style={{ display: "grid", alignItems: "center", height: "100vh", justifyContent: "center", textAlign: "center", lineHeight: "2" }}>
    <div>
      <h1 style={{ margin: 0, fontWeight: 300 }}>Not so fast!</h1>
      You need a password sweetheart<br />
      <span style={{ fontSize: "4em", color: "#FE4365" }} onClick={handleClick}>
        <input ref={inputRef} onChange={handleChange} type="text" style={{ position: "absolute", top: "-100vh" }} />
        <FaRegKissWinkHeart />
      </span>
    </div>
  </div>}
  </>
}

export default LockOut