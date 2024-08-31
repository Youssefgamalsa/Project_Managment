import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../../BaseUrls/BaseUrls";
import { useEffect, useState } from "react";

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  let navigate = useNavigate();
  let getProducts = async () => {
    try {
      let response = await axios.get(`${baseurl}/Project/manager`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjectList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
        <h3> Projects </h3>
        <button
          className="px-4 py-2 rounded-5 text-white"
          style={{backgroundColor:'#EF9B28' , border:'none'}}
          onClick={() => navigate("/dashboard/projects-data")}
        >
        <i className="fa-solid fa-plus mx-2"></i> Add New Project </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" >Title</th>
            <th scope="col">No of Tasks </th>
            <th scope="col">Description </th>
            <th scope="col">Actions </th>
          </tr>
        </thead>
        <tbody>
          {projectList.length > 0
            ? projectList.map((project) => (
                <tr key={project.id}>
                  <td>{project?.title}</td>
                  <td> {project.task.length} </td>
                  <td>{project?.description}</td>
                  <td style={{ cursor: "pointer" }}>
                    <i className="fa fa-eye mx-1" />
                    <i className="fa fa-edit mx-1" />
                    <i className="fa fa-trash mx-1" />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
