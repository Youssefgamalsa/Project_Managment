import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.png";
export default function AuthLayout({ imgurl }) {
  const path = window.location.pathname ;
  // const padd = path =='/register'? "col-lg-8" : "col-lg-5" 
  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${imgurl})` }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="logo">
            <img src={logo} alt="auth_logo" />
          </div>
          <div className={`col-md-6 p-5 cont`}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
