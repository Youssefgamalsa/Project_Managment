import axios from "axios"
import { useForm } from "react-hook-form"
import { baseProjectsUrls } from "../../../BaseUrls/BaseUrls"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { useEffect } from "react"

export default function ProjectData() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { projectData } = state || {}

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    // If projectData exists, populate the form with it
    if (projectData) {
      setValue("title", projectData.title)
      setValue("description", projectData.description)
    }
  }, [projectData, setValue])

  const onSubmit = async (data) => {
    try {
      const url = projectData
        ? baseProjectsUrls.updateProjectById(projectData.id)
        : baseProjectsUrls.createProject
      const method = projectData ? "put" : "post"

      let response = await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      console.log(response)
      navigate("/dashboard/projects")
      toast.success(`Project ${projectData ? "Updated" : "Added"} Successfully`)
    } catch (error) {
      console.log(error)
      toast.error(`Failed to ${projectData ? "update" : "add"} project`)
    }
  }

  return (
    <>
      <div className="title bg-white p-2 shadow-sm my-2">
        <h5
          onClick={() => navigate("/dashboard/projects")}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-chevron-left mx-1"></i> View All Projects
        </h5>
        <h2>{projectData ? "Edit Project" : "Add a New Project"}</h2>
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
        <div className="btns d-flex justify-content-between align-items-center my-3">
          <button
            className="btn btn-outline-secondary rounded-5 d-inline-block"
            type="button"
            onClick={() => navigate("/dashboard/projects")}
          >
            Cancel
          </button>
          <button className="rounded-5 d-inline-block submit" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  )
}
