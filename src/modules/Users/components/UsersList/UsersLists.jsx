import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Table, Button, Form, InputGroup, Pagination } from "react-bootstrap"
import baseUsersAuth from "../../../BaseUrls/BaseUrls"

export default function UsersLists() {
  const [usersList, setUsersList] = useState([])
  const [nameValue, setNameValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [totalPages, setTotalPages] = useState(0)

  let navigate = useNavigate()

  const getUsers = async (
    pageNo = currentPage,
    pageSizeParam = pageSize,
    nameInput = nameValue
  ) => {
    try {
      let response = await axios.get(baseUsersAuth.GetUsersURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          pageNumber: pageNo,
          pageSize: pageSizeParam,
          userName: nameInput,
        },
      })
      setUsersList(response.data.data)
      setTotalPages(response.data.totalNumberOfPages)
    } catch (error) {
      console.log(error)
    }
  }

  const toggleUserStatus = async (id, isActivated) => {
    try {
      await axios.put(
        baseUsersAuth.toggleActivatedEmployee(id),
        {
          isActivated: !isActivated,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      setUsersList((prevUsersList) =>
        prevUsersList.map((user) =>
          user.id === id ? { ...user, isActivated: !isActivated } : user
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setNameValue(searchValue)
    setCurrentPage(1)
    getUsers(1, pageSize, searchValue)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    getUsers(pageNumber, pageSize, nameValue)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="m-4">
      <h2 className="mx-2 my-4 text-black-50">Users</h2>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name"
          value={nameValue}
          onChange={handleSearch}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Status</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((user) => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>
                {user.isActivated ? (
                  <Button variant="success" size="sm">
                    Active
                  </Button>
                ) : (
                  <Button variant="danger" size="sm">
                    Not Active
                  </Button>
                )}
              </td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>
                <Form.Check
                  type="switch"
                  checked={user.isActivated}
                  onChange={() => toggleUserStatus(user.id, user.isActivated)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  )
}
