import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { baseTasksUrls } from "../../../BaseUrls/BaseUrls"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../../context/AuthContext"
import Swal from "sweetalert2"
import { Modal, Button } from "react-bootstrap"

export default function TasksList() {
  let { userData } = useContext(AuthContext)

  const [tasksList, setTasksList] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  let navigate = useNavigate()

  const getManagerTasks = async () => {
    try {
      let response = await axios.get(baseTasksUrls.getAllManagerTasks, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setTasksList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getEmployeeTasks = async () => {
    try {
      let response = await axios.get(baseTasksUrls.getAllAssignedTasks, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setTasksList(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    userData?.userGroup === "Manager" ? getManagerTasks() : getEmployeeTasks()
  }, [userData])

  const handleDelete = async (taskId) => {
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
        await axios.delete(baseTasksUrls.deleteTaskById(taskId), {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setTasksList(tasksList.filter((task) => task.id !== taskId))
        Swal.fire("Deleted!", "Your task has been deleted.", "success")
      } catch (error) {
        console.log(error)
        Swal.fire("Failed!", "There was a problem deleting the task.", "error")
      }
    }
  }

  const handleShowModal = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedTask(null)
  }

  return (
    <>
      {userData?.userGroup === "Manager" ? (
        <div>
          <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
            <h3>Tasks</h3>
            <button
              className="px-4 py-2 rounded-5 text-white"
              style={{ backgroundColor: "#EF9B28", border: "none" }}
              onClick={() => navigate("/dashboard/tasks-data")}
            >
              <i className="fa-solid fa-plus mx-2"></i> Add New Task
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Status</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.length > 0
                ? tasksList.map((task) => (
                    <tr key={task.id}>
                      <td>{task?.title}</td>
                      <td>{task?.status}</td>
                      <td>{task?.description}</td>
                      <td style={{ cursor: "pointer" }}>
                        <i
                          className="fa fa-eye mx-1"
                          onClick={() => handleShowModal(task)}
                        />
                        <Link
                          to={`/dashboard/tasks-data/${task.id}`}
                          state={{ taskData: task }}
                        >
                          <i className="fa fa-edit mx-1" />
                        </Link>
                        <i
                          className="fa fa-trash mx-1 text-danger"
                          onClick={() => handleDelete(task.id)}
                        />
                      </td>
                    </tr>
                  ))
                : "No Data"}
            </tbody>
          </table>

          {/* Task Details Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Task Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedTask && (
                <>
                  <p>
                    <strong>ID:</strong> {selectedTask.id}
                  </p>
                  <p>
                    <strong>Title:</strong> {selectedTask.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedTask.description}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedTask.status}
                  </p>
                  <p>
                    <strong>Creation Date:</strong>{" "}
                    {new Date(selectedTask.creationDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Modification Date:</strong>{" "}
                    {new Date(selectedTask.modificationDate).toLocaleString()}
                  </p>
                  <p>
                    <strong>Employee:</strong> {selectedTask.employee?.userName}
                  </p>
                  <p>
                    <strong>Project:</strong> {selectedTask.project?.title}
                  </p>
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
      ) : (
        <div>
          <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
            <h3>Tasks</h3>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasksList.length > 0
                ? tasksList.map((task) => (
                    <tr key={task.id}>
                      <td>{task?.id}</td>
                      <td>{task?.title}</td>
                      <td>{task?.description}</td>
                      <td>{task?.status}</td>
                      <td>{task?.dueDate}</td>
                    </tr>
                  ))
                : "No Data"}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
