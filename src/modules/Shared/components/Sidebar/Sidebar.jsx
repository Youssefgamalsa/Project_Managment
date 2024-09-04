import React, { useContext, useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaUser,
  FaSignOutAlt,
  FaLock,
} from "react-icons/fa"
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi"
import { AuthContext } from "../../../../context/AuthContext"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { useForm } from "react-hook-form"
import axios from "axios"
import baseUsersAuth from "../../../BaseUrls/BaseUrls"
import styles from "./Sidebar.module.css"

export default function Sidebarr() {
  const [menuCollapse, setMenuCollapse] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()
  const navigate = useNavigate()
  let { userData } = useContext(AuthContext)

  const menuIconClick = () => {
    setMenuCollapse(!menuCollapse)
  }

  const onSubmit = (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }

    axios
      .post(baseUsersAuth.changepass, data, config)
      .then((response) => {
        setAlert({
          show: true,
          message: "Password changed successfully!",
          variant: "success",
        })
        setShowModal(false)
        reset()
      })
      .catch((error) => {
        setAlert({
          show: true,
          message: error.response?.data?.message || "Failed to change password",
          variant: "danger",
        })
      })
  }

  return (
    <>
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
            component={
              <NavLink
                to="/Dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            }
          >
            Home
          </MenuItem>

          {userData?.userGroup === "Manager" && (
            <MenuItem
              icon={<FaUser />}
              component={
                <NavLink
                  to="/Dashboard/Users"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Users
                </NavLink>
              }
            >
              Users
            </MenuItem>
          )}

          <MenuItem
            icon={<FaProjectDiagram />}
            component={
              <NavLink
                to="/Dashboard/Projects"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Projects
              </NavLink>
            }
          >
            Projects
          </MenuItem>

          <MenuItem
            icon={<FaTasks />}
            component={
              <NavLink
                to="/Dashboard/Tasks"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Tasks
              </NavLink>
            }
          >
            Tasks
          </MenuItem>

          <MenuItem icon={<FaLock />} onClick={() => setShowModal(true)}>
            Change Password
          </MenuItem>

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

      {/* Change Password */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert.show && (
            <Alert
              variant={alert.variant}
              onClose={() =>
                setAlert({ show: false, message: "", variant: "" })
              }
              dismissible
            >
              {alert.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="oldPassword" className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                {...register("oldPassword", { required: true })}
              />
              {errors.oldPassword && (
                <small className="text-danger">Old password is required</small>
              )}
            </Form.Group>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                {...register("newPassword", { required: true, minLength: 6 })}
              />
              {errors.newPassword && (
                <small className="text-danger">
                  New password is required and should be at least 6 characters
                  long
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="confirmNewPassword" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmNewPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              {errors.confirmNewPassword && (
                <small className="text-danger">
                  {errors.confirmNewPassword.message}
                </small>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
