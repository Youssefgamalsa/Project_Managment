import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { FaProjectDiagram, FaTasks, FaUser } from "react-icons/fa"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"

export default function Sidebarr() {
  const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse)
  }

  return (
    <Sidebar collapsed={menuCollapse} className="pp">
      <div className="closemenu" onClick={menuIconClick}>
        {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
      </div>

      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              color: "#EF9B28 !important",
            },
          },
        }}
      >
        <MenuItem
          icon={<FaUser />}
          component={<NavLink to="/Dashboard/Users" activeClassName="active" />}
        >
          Users
        </MenuItem>
        <MenuItem
          icon={<FaProjectDiagram />}
          component={
            <NavLink to="/Dashboard/Projects" activeClassName="active" />
          }
        >
          Projects
        </MenuItem>
        <MenuItem
          icon={<FaTasks />}
          component={<NavLink to="/Dashboard/Tasks" activeClassName="active" />}
        >
          Tasks
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}
