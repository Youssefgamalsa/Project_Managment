import { jwtDecode } from "jwt-decode"
import { createContext, useEffect, useState } from "react"

export let AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const decoded = jwtDecode(token)
      setUserData(decoded)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ userData }}>{children}</AuthContext.Provider>
  )
}
