import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Container, Row, Col, Card } from "react-bootstrap"
import Header from "../Shared/Header/Header"
import baseUsersAuth, {
  baseTasksUrls,
  baseProjectsUrls,
} from "../BaseUrls/BaseUrls"
import { AuthContext } from "../../context/AuthContext"

export default function Dashboard() {
  const [users, setUsers] = useState({ active: 0, inactive: 0 })
  const [tasks, setTasks] = useState({ progress: 0, total: 0 })
  const [projects, setProjects] = useState(0)
  const { userData } = useContext(AuthContext)
  useEffect(() => {
    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }

    // User Data
    userData?.userGroup === "Manager"
      ? axios
          .get(baseUsersAuth.getUsersCount, headers)
          .then((response) => {
            setUsers({
              active: response.data.activatedEmployeeCount,
              inactive: response.data.deactivatedEmployeeCount,
            })
          })
          .catch((error) => console.error("Error fetching user data:", error))
      : ""

    // Task Data
    axios
      .get(baseTasksUrls.countTasks, headers)
      .then((response) => {
        setTasks({
          progress: response.data.inProgress,
          total:
            +response.data.done +
            +response.data.inProgress +
            +response.data.toDo,
        })
      })
      .catch((error) => console.error("Error fetching task data:", error))

    // Project Data
    axios
      .get(
        userData?.userGroup === "Manager"
          ? baseProjectsUrls.getManagerProjects
          : baseProjectsUrls.getEmployeeProjects,
        headers
      )
      .then((response) => {
        setProjects(response.data.totalNumberOfRecords)
      })
      .catch((error) => console.error("Error fetching project data:", error))
  }, [])

  return (
    <>
      <Header />
      <Container fluid className="pt-4">
        <Row>
          <Col md={6}>
            <Card className="mb-4 border-0">
              <Card.Body>
                <Card.Header className="mb-3 border-0 position-relative bg-white">
                  <h5>Tasks</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Placeat, ad.
                  </p>
                  <div className="line"></div>
                </Card.Header>
                <Row>
                  <Col>
                    <Card className="text-center border-0 rounded bg-sec text-white">
                      <Card.Body>
                        <Card.Title>Progress</Card.Title>
                        <Card.Text>{tasks.progress}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="text-center border-0 rounded bg-sec text-white">
                      <Card.Body>
                        <Card.Title>Tasks Number</Card.Title>
                        <Card.Text>{tasks.total}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card className="text-center border-0 rounded bg-sec text-white">
                      <Card.Body>
                        <Card.Title>Projects Number</Card.Title>
                        <Card.Text>{projects}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          {userData?.userGroup === "Manager" ? (
            <Col md={6}>
              <Card className="mb-4 border-0">
                <Card.Body>
                  <Card.Header className="mb-3 border-0 position-relative bg-white">
                    <h5>Users</h5>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Placeat, ad.
                    </p>
                    <div className="line"></div>
                  </Card.Header>
                  <Row>
                    <Col>
                      <Card className="text-center border-0 rounded bg-sec text-white">
                        <Card.Body>
                          <Card.Title>Active</Card.Title>
                          <Card.Text>{users.active}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="text-center border-0 rounded bg-sec text-white">
                        <Card.Body>
                          <Card.Title>Inactive</Card.Title>
                          <Card.Text>{users.inactive}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </>
  )
} 