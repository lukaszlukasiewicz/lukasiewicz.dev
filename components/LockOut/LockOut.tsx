import { useEffect, useState } from "react"

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
  return <>{authorized ? children : <div style={{ display: "grid", alignItems: "center", height: "100vh", justifyContent: "center" }}>You are locked down. Enter passphrase</div>}</>
}

export default LockOut