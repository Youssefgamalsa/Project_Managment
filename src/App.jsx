import { createHashRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Login from "./modules/Authentication/components/Login/Login"
import Register from "./modules/Authentication/components/Register/Register"
import Verify from "./modules/Authentication/components/Verify/Verify"
import ResetPass from "./modules/Authentication/components/Reset/ResetPass"
import Changepass from "./modules/Authentication/components/Changepass/Changepass"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import ResetRequest from "./modules/Authentication/components/ResetRequest/ResetRequest"
import MaterLayout from "./modules/Shared/components/MasterLayout/MaterLayout"
import NotFound from "./modules/Shared/components/NotFound/NotFound"
import Dashboard from "./modules/Dashboard/Dashboard"
import ProjectList from "./modules/Projects/components/ProjectList/ProjectList"
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData"
import TasksList from "./modules/Tasks/components/TasksList/TasksList"
import UsersLists from "./modules/Users/components/UsersList/UsersLists"
import TaskData from "./modules/Tasks/components/TaskData/TaskData"
// import imgurl1 from "./assets/images/bg1.png";
// import imgurl2 from "./assets/images/bg2.png";
import imgurl3 from "./assets/images/bg3.png"
import AuthLayout from "./modules/Shared/components/AuthmoLayout/AuthLayout"
import ProtectedRoutes from "./modules/Shared/components/ProtectedRoute/ProtectedRoute"
function App() {
  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout imgurl={imgurl3} />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "/login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify", element: <Verify /> },
        { path: "resetpass", element: <ResetPass /> },
        { path: "forgetpass", element: <ResetRequest /> },
        { path: "changepass", element: <Changepass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoutes>
          <MaterLayout />
        </ProtectedRoutes>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "", element: <Dashboard /> },
        { path: "projects", element: <ProjectList /> },
        { path: "projects-data", element: <ProjectData /> },
        { path: "projects-data/:id", element: <ProjectData /> },
        { path: "tasks", element: <TasksList /> },
        { path: "tasks-data", element: <TaskData /> },
        { path: "tasks-data/:id", element: <TaskData /> },
        { path: "users", element: <UsersLists /> },
      ],
    },
  ])
  return <RouterProvider router={routes} />
}

export default App
