const baseurl = "https://upskilling-egypt.com:3003/api/v1" ;

const baseUsers = `${baseurl}/Users` ; 

 const baseUsersAuth = {
    login:`${baseUsers}/Login`,
    register:`${baseUsers}/Register`,
    resetrequest:`${baseUsers}/Reset/Request`,
    reset:`${baseUsers}/Reset`,
    verify:`${baseUsers}/verify`,
    changepass:`${baseUsers}/ChangePass`,
}
export default baseUsersAuth;