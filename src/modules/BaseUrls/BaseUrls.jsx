export const baseurl = "https://upskilling-egypt.com:3003/api/v1";

export const baseUsers = `${baseurl}/Users`;

export const RequestHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};
const baseUsersAuth = {
  login: `${baseUsers}/Login`,
  register: `${baseUsers}/Register`,
  resetrequest: `${baseUsers}/Reset/Request`,
  reset: `${baseUsers}/Reset`,
  verify: `${baseUsers}/verify`,
  changepass: `${baseUsers}/ChangePassword`,
  GetUsersURL: `${baseUsers}/Manager`,
};

export default baseUsersAuth;
