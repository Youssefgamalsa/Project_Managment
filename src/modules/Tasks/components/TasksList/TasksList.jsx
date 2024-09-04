import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseurl, RequestHeaders } from "../../../BaseUrls/BaseUrls";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
export default function TasksList() {
  const [taskList, setTaskList] = useState([]);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let getTasks = async () => {
    try {
      let response = await axios.get(`${baseurl}/Task/manager`, RequestHeaders);
      setTaskList(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let delete_task = async (id) => {
    try {
      let response = await axios.delete(
        `${baseurl}/Task/${id}`,
        RequestHeaders
      );
      console.log(response);
      handleClose();
      toast.success("Deleted Task Successfully ");
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
        <h3> Tasks </h3>
        <button
          className="px-4 py-2 rounded-5 text-white"
          style={{ backgroundColor: "#EF9B28", border: "none" }}
          onClick={() => navigate("/dashboard/tasks-data")}
        >
          <i className="fa-solid fa-plus mx-2"></i> Add New Task{" "}
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Status</th>
            <th scope="col">Username </th>
            <th scope="col">Project </th>
            <th>Acttios </th>
          </tr>
        </thead>
        <tbody>
          {taskList.length > 0
            ? taskList.map((task) => (
                <>
                  <tr key={task.id}>
                    <td>{task?.title}</td>
                    <td>
                      {task?.status == "ToDo" ? (
                        <span className="ToDo">to do </span>
                      ) : (
                        <span className="done"> Done </span>
                      )}{" "}
                    </td>
                    <td>{task?.project.manager.userName}</td>
                    <td>{task?.project.title}</td>
                    <td>
                      <td style={{ cursor: "pointer" }}>
                        <i className="fa fa-eye mx-1" />
                        <i className="fa fa-edit mx-1" />
                        <i className="fa fa-trash mx-1" onClick={handleShow} />
                      </td>
                    </td>
                  </tr>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {" "}
                        Are You Want To Delete This Task{" "}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => delete_task(task.id)}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              ))
            : ""}
        </tbody>
      </table>
    </>
  );
}
