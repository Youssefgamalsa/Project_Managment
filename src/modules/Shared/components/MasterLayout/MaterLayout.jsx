
import Navbar from "../Navbar/Navbar";
import Sideba from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MaterLayout() {
  return (
    <>
      <Navbar />
      <Sideba />
      <Outlet />
    </>
  );
}
