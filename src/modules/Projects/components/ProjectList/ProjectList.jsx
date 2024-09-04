import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { baseProjectsUrls } from "../../../BaseUrls/BaseUrls"
import { AuthContext } from "../../../../context/AuthContext"
import Swal from "sweetalert2"
import { Modal, Button } from "react-bootstrap"

export default function ProjectList() {
  const { userData } = useContext(AuthContext)
  const [projectList, setProjectList] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const navigate = useNavigate()

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const url =
        userData?.userGroup === "Manager"
          ? baseProjectsUrls.getManagerProjects
          : baseProjectsUrls.getEmployeeProjects

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setProjectList(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [userData])

  const handleDelete = async (projectId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        await axios.delete(baseProjectsUrls.deleteProjectById(projectId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setProjectList(
          projectList.filter((project) => project.id !== projectId)
        )
        Swal.fire("Deleted!", "Your project has been deleted.", "success")
      } catch (error) {
        Swal.fire(
          "Failed!",
          "There was a problem deleting the project.",
          "error"
        )
        console.error(error)
      }
    }
  }

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedProject(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
        <h3>Projects</h3>
        {userData?.userGroup === "Manager" && (
          <button
            className="px-4 py-2 rounded-5 text-white bg-warning border-0"
            onClick={() => navigate("/dashboard/projects-data")}
          >
            <i className="fa-solid fa-plus mx-2"></i> Add New Project
          </button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            {userData?.userGroup === "Manager" ? (
              <>
                <th scope="col">Title</th>
                <th scope="col">No of Tasks</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </>
            ) : (
              <>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Tasks</th>
                <th scope="col">Creation Date</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {projectList.length > 0 ? (
            projectList.map((project) => (
              <tr key={project.id}>
                {userData?.userGroup === "Manager" ? (
                  <>
                    <td>{project.title}</td>
                    <td>{project.task.length}</td>
                    <td>{project.description}</td>
                    <td>
                      <i
                        className="fa fa-eye mx-1 cursor-pointer"
                        onClick={() => handleViewDetails(project)}
                      />
                      <Link
                        to={`/dashboard/projects-data/${project.id}`}
                        state={{ projectData: project }}
                      >
                        <i className="fa fa-edit mx-1 cursor-pointer" />
                      </Link>
                      <i
                        className="fa fa-trash mx-1 text-danger cursor-pointer"
                        onClick={() => handleDelete(project.id)}
                      />
                    </td>
                  </>
                ) : (
                  <>
                    <td>{project.id}</td>
                    <td>{project.title}</td>
                    <td>{project.description}</td>
                    <td>{project.task.length}</td>
                    <td>{project.creationDate}</td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={userData?.userGroup === "Manager" ? 4 : 5}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Project Details Modal.. */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProject && (
            <>
              <h5>Title: {selectedProject.title}</h5>
              <p>
                <strong>Description:</strong> {selectedProject.description}
              </p>
              <p>
                <strong>Creation Date:</strong>{" "}
                {new Date(selectedProject.creationDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Modification Date:</strong>{" "}
                {new Date(
                  selectedProject.modificationDate
                ).toLocaleDateString()}
              </p>
              <h6>Tasks:</h6>
              <ul>
                {selectedProject.task.map((task) => (
                  <li key={task.id}>
                    <strong>{task.title}</strong> - {task.description} (Status:{" "}
                    {task.status})
                  </li>
                ))}
              </ul>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
