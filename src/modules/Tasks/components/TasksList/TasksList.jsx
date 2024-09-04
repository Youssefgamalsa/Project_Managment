import { useNavigate } from "react-router-dom"

export default function TasksList() {
  const navigate = useNavigate()
  return (
    <>
      <div className="title d-flex justify-content-between align-items-center p-4 bg-white shadow-sm mb-3">
        <h3> Tasks </h3>
        <button
          className="px-4 py-2 rounded-5 text-white"
          style={{ backgroundColor: "#EF9B28", border: "none" }}
          onClick={() => navigate("/Dashboard/tasks-data")}
        >
          <i className="fa-solid fa-plus mx-2"></i>
          Add New Project
        </button>
      </div>
    </>
  )
}
