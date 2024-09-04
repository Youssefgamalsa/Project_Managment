export const baseurl = "https://upskilling-egypt.com:3003/api/v1"

const baseUsers = `${baseurl}/Users`

const baseUsersAuth = {
  login: `${baseUsers}/Login`,
  register: `${baseUsers}/Register`,
  resetrequest: `${baseUsers}/Reset/Request`,
  reset: `${baseUsers}/Reset`,
  verify: `${baseUsers}/verify`,
  changepass: `${baseUsers}/ChangePassword`,
  GetUsersURL: `${baseUsers}/Manager`,
}
const baseTasks = `${baseurl}/Task`

export const baseTasksUrls = {
  createTask: `${baseTasks}`,
  getAllAssignedTasks: `${baseTasks}`,
  getAllManagerTasks: `${baseTasks}/manager`,
  getTaskById: (id) => `${baseTasks}/${id}`,
  updateTaskById: (id) => `${baseTasks}/${id}`,
  deleteTaskById: (id) => `${baseTasks}/${id}`,
  countTasks: `${baseTasks}/count`,
  changeTaskStatus: (id) => `${baseTasks}/${id}/change-status`,
  getAllTasksInProject: (projectId) => `${baseTasks}/project/${projectId}`,
}

const baseProjects = `${baseurl}/Project`

export const baseProjectsUrls = {
  createProject: `${baseProjects}`,
  getProjectById: (id) => `${baseProjects}/${id}`,
  updateProjectById: (id) => `${baseProjects}/${id}`,
  deleteProjectById: (id) => `${baseProjects}/${id}`,
  getManagerProjects: `${baseProjects}/manager`,
  getEmployeeProjects: `${baseProjects}/employee`,
  getAllProjects: `${baseProjects}`,
}

export default baseUsersAuth
