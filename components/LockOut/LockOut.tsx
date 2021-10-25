import { useEffect, useState } from "react"

const pass = "1234"

const LockOut: React.FC = ({ children }) => {

  const [phrase, setPhrase] = useState("");
  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key == "Enter") setPhrase("")
      else setPhrase(phrase + key)
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [phrase])
  return <>{phrase == pass ? children : <div style={{ display: "grid", alignItems: "center", height: "100vh", justifyContent: "center" }}>You are locked down. Enter passphrase</div>}</>
}

export default LockOut