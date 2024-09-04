import axios from "axios";
import { useForm } from "react-hook-form";
import baseUsersAuth, {
  baseurl,
  baseUsers,
  RequestHeaders,
} from "../../../BaseUrls/BaseUrls";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

export default function TaskData() {
  let navigate = useNavigate();
  const [UsersList, setUsersList] = useState([]);
  const [projectList, setProjectList] = useState([]);

  let getUsers = async (pageNo = 1, pageSize = 2, nameInput = "") => {
    try {
      let response = await axios.get(baseUsers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          pageNumber: pageNo,
          pageSize: pageSize,
          userName: nameInput,
        },
      });
      setUsersList(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  let getProjects = async () => {
    try {
      let response = await axios.get(
        `${baseurl}/Project/manager`,
        RequestHeaders
      );
      setProjectList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let onsubmit = async (data) => {
    try {
      let response = await axios.post(`${baseurl}/Task`, data, RequestHeaders);
      console.log(response);
      navigate("/dashboard/tasks");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
    getProjects();
  }, []);
  return (
    <>
      <div className="title bg-white p-2 shadow-sm my-2">
        <h5
          onClick={() => navigate("/dashboard/tasks")}
          style={{ cursor: "pointer" }}
        >
          <i className="fa-solid fa-chevron-left mx-1"></i> view all Tasks{" "}
        </h5>
        <h2> Add a New Task </h2>
      </div>
      <form
        className="w-75 m-auto p-5 shadow-lg my-3"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="my-2">
          <label htmlFor="title" className="my-1">
            title
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
            description
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

        <div className="selects d-flex">
          <div className="w-100">
            <label htmlFor="users"> User </label>
            <select
              className="form-control w-75"
              id="users"
              {...register("employeeId", {
                required: "employeeId is REquired  ",
              })}
            >
              <option value={0}>Choose </option>

              {UsersList.map((user) => (
                <option key={user.id} value={user?.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </div>

          <div className="w-100">
            <label htmlFor="Projects"> Projects </label>
            <select
              className="form-control w-75"
              id="Projects"
              {...register("projectId", {
                required: "projectTitle is REquired  ",
              })}
            >
              <option value={null}> Choose </option>

              {projectList.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
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
  );
}
