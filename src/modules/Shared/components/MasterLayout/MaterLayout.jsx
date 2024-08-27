import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

export default function MaterLayout() {
  return (
    <div className="sidebar overflow-hidden">
      <div className="row vh-100">
        <div className="col-md-2 ">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
