const baseApi = "https://upskilling-egypt.com:3003/api"

const baseUsers = `${baseApi}/v1/Users`

const baseUsersAuth = {
  login: `${baseUsers}/Login`,
  register: `${baseUsers}/Register`,
  resetrequest: `${baseUsers}/Reset/Request`,
  reset: `${baseUsers}/Reset`,
  verify: `${baseUsers}/verify`,
  changepass: `${baseUsers}/ChangePassword`,
  GetUsersURL: `${baseUsers}/Manager`,
  createManager: `${baseUsers}/Create`,
  getUserById: (id) => `${baseUsers}/${id}`,
  toggleActivatedEmployee: (id) => `${baseUsers}/${id}`,
  getUsersCount: `${baseUsers}/count`,
  getCurrentUser: `${baseUsers}/currentUser`,
  getAndFilterUsers: `${baseUsers}`,
  updateCurrentProfile: `${baseUsers}`,
}

const baseTasks = `${baseApi}/v1/Task`

const baseTasksUrls = {
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

const baseProjects = `${baseApi}/v1/Project`

const baseProjectsUrls = {
  createProject: `${baseProjects}`,
  getProjectById: (id) => `${baseProjects}/${id}`,
  updateProjectById: (id) => `${baseProjects}/${id}`,
  deleteProjectById: (id) => `${baseProjects}/${id}`,
  getManagerProjects: `${baseProjects}/manager`,
  getEmployeeProjects: `${baseProjects}/employee`,
  getAllProjects: `${baseProjects}`,
}

export { baseTasksUrls, baseProjectsUrls }
export default baseUsersAuth
