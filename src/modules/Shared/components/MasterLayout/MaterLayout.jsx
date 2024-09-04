import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

export default function MaterLayout() {
  return (
    <div className=" overflow-hidden-x">
      <div className="row h-100">
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
