import axios from "axios"
import { useForm } from "react-hook-form"
import baseUsersAuth, {
  baseTasksUrls,
  baseProjectsUrls,
} from "../../../BaseUrls/BaseUrls"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function TaskData() {
  let navigate = useNavigate()
  let location = useLocation()
  let taskData = location.state?.taskData

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [employees, setEmployees] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        let response = await axios.get(baseUsersAuth.getAndFilterUsers, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setEmployees(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchProjects = async () => {
      try {
        let response = await axios.get(baseProjectsUrls.getManagerProjects, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setProjects(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchEmployees()
    fetchProjects()

    if (taskData) {
      reset({
        title: taskData.title,
        description: taskData.description,
        employeeId: taskData.employee?.id || "",
        projectId: taskData.project?.id || "",
      })
    }
  }, [taskData, reset])

  const onSubmit = async (data) => {
    try {
      if (taskData) {
        await axios.put(`${baseTasksUrls.updateTaskById(taskData.id)}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        toast.success("Task Updated Successfully")
      } else {
        await axios.post(baseTasksUrls.createTask, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        toast.success("Task Added Successfully")
      }
      navigate("/dashboard/tasks")
    } catch (error) {
      console.log(error)
      toast.error(taskData ? "Failed to update task" : "Failed to add task")
    }
  }

  return (
    <>
      <div className="title bg-white p-2 shadow-sm my-2">
        <h5
          onClick={() => navigate("/dashboard/tasks")}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-chevron-left mx-1"></i> View All Tasks
        </h5>
        <h2>{taskData ? "Edit Task" : "Add a New Task"}</h2>
      </div>
      <form
        className="w-75 m-auto p-5 shadow-lg my-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="my-2">
          <label htmlFor="title" className="my-1">
            Title
          </label>
          <input
            className="form-control"
            placeholder="Title"
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="description" className="my-1">
            Description
          </label>
          <textarea
            className="form-control"
            placeholder="Description"
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="employeeId" className="my-1">
            Employee
          </label>
          <select
            className="form-control"
            id="employeeId"
            {...register("employeeId", { required: "Employee is required" })}
          >
            <option value="">Select an Employee</option>
            {employees.map((employee) =>
              taskData?.employee?.id === employee.id ? (
                <option key={employee.id} value={employee.id} selected>
                  {employee.userName}
                </option>
              ) : (
                <option key={employee.id} value={employee.id}>
                  {employee.userName}
                </option>
              )
            )}
          </select>
          {errors.employeeId && (
            <span className="text-danger">{errors.employeeId.message}</span>
          )}
        </div>
        <div className="my-2">
          <label htmlFor="projectId" className="my-1">
            Project
          </label>
          <select
            className="form-control"
            id="projectId"
            {...register("projectId", { required: "Project is required" })}
          >
            <option value="">Select a Project</option>
            {projects.map((project) =>
              taskData?.project?.id === project.id ? (
                <option key={project.id} value={project.id} selected>
                  {project.title}
                </option>
              ) : (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              )
            )}
          </select>
          {errors.projectId && (
            <span className="text-danger">{errors.projectId.message}</span>
          )}
        </div>
        <div className="btns d-flex justify-content-between align-items-center my-3">
          <button
            className="btn btn-outline-secondary rounded-5 d-inline-block"
            type="button"
            onClick={() => navigate("/dashboard/tasks")}
          >
            Cancel
          </button>
          <button className="rounded-5 d-inline-block submit" type="submit">
            {taskData ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </>
  )
}
