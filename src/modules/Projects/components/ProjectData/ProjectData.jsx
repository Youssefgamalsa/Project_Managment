import axios from "axios"
import { useForm } from "react-hook-form"
import { baseProjectsUrls, baseurl } from "../../../BaseUrls/BaseUrls"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProjectData() {
  let navigate = useNavigate()
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  let onsubmit = async (data) => {
    try {
      let response = await axios.post(baseProjectsUrls.createProject, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(response)
      toast.success("Project Added Successfully")
      navigate("/dashboard/projects")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="title bg-white p-2 shadow-sm my-2">
        <h5
          onClick={() => navigate("/dashboard/projects")}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-chevron-left mx-1"></i> View all projects
        </h5>
        <h2> Add a New Project </h2>
      </div>
      <form
        className="w-75 m-auto p-5 shadow-lg my-3"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="my-2">
          <label htmlFor="title" className="my-1">
            Title
          </label>
          <input
            className="form-control "
            placeholder="title"
            id="title"
            {...register("title", { required: "title is required " })}
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
            placeholder="description"
            id="description"
            {...register("description", {
              required: "description is required ",
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
