import axios from "axios";
import { baseurl, RequestHeaders } from "../../../BaseUrls/BaseUrls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const [projectList, setProjectList] = useState([]);
  const [id, setId] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  let delete_project = async () => {
    try {
      let response = await axios.delete(
        `${baseurl}/Project/${id}`,
        RequestHeaders
      );
      console.log(response);
      toast.success("Deleted Project Successfully");
      handleClose();
      getProjects();
    } catch (error) {
      console.log(error);
    }
  };
  const getProjects = async () => {
    try {
      let response = await axios.get(
        `${baseurl}/Project/manager`,
        RequestHeaders
      );
      setProjectList(response.data.data);
      // console.log(response.data.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
        <h3> Projects </h3>
        <button
          className="px-4 py-2 rounded-5 text-white"
          style={{ backgroundColor: "#EF9B28", border: "none" }}
          onClick={() => navigate("/dashboard/projects-data")}
        >
          <i className="fa-solid fa-plus mx-2"></i> Add New Project{" "}
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
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
                    <i
                      className="fa fa-trash mx-1"
                      onClick={() => handleShow(project.id)}
                    />
                  </td>
                </tr>
              ))
            : ""}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Want To Delete This Project</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => delete_project()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
