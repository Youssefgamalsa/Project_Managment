import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { FaHome,
  FaKey,
  FaProjectDiagram,
  FaSignOutAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { AuthContext } from "../../../../context/AuthContext"
import styles from "./Sidebar.module.css"

export default function Sidebarr() {
  const navigate = useNavigate()
  const [menuCollapse, setMenuCollapse] = useState(false)
  let { userData } = useContext(AuthContext)

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse)
  }

  return (
    <Sidebar collapsed={menuCollapse} className="pp">
      <div className={styles.closewrapper}>
        <div className={styles.closemenu} onClick={menuIconClick}>
          {menuCollapse ? (
            <FiArrowRightCircle className="text-white cursor-pointer" />
          ) : (
            <FiArrowLeftCircle className="text-white cursor-pointer" />
          )}
        </div>
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
          icon={<FaHome />}
          component={<NavLink to="/Dashboard" activeClassName="active" />}
        >
          Home
        </MenuItem>

        {userData?.userGroup == "Manager" ? (
          <MenuItem
            icon={<FaUser />}
            component={
              <NavLink to="/Dashboard/Users" activeClassName="active" />
            }
          >
            Users
          </MenuItem>
        ) : (
          ""
        )}

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
        <MenuItem icon={<FaKey />}>Change Password</MenuItem>
        <MenuItem
          icon={<FaSignOutAlt />}
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Sidebar>
  )
}
