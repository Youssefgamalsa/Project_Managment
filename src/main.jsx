import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { ToastContainer } from "react-toastify"
import { AuthContextProvider } from "./context/AuthContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>
)
