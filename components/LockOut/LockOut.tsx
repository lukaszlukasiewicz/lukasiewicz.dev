import React, { useEffect, useState } from "react"
import { FaRegKissWinkHeart } from "react-icons/fa"

const pass = "1234"

const LockOut: React.FC = ({ children }) => {

  const [phrase, setPhrase] = useState("");
  const [authorized, authorize] = useState(false)

  if (!authorized && phrase == pass) authorize(true);
  useEffect(() => {
    if (authorized) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key == "Enter") setPhrase("")
      else setPhrase(phrase + key)
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [phrase, authorized])

  const handleClick = (e: React.MouseEvent) => {
    e.currentTarget.querySelector("input")?.focus();
  }

  return <>{authorized ? children : <div style={{ display: "grid", alignItems: "center", height: "100vh", justifyContent: "center", textAlign: "center", lineHeight: "2" }}>
    <div>
      You are locked out.<br />
      Enter passphrase sweetheart<br />
      <span style={{ fontSize: "4em", color: "#FE4365" }} onClick={handleClick}>
        <input type="text" style={{ display: "none" }} />
        <FaRegKissWinkHeart />
      </span>
    </div>
  </div>}
  </>
}

export default LockOut