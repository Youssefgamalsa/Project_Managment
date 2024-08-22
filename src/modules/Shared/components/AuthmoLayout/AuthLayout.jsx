import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/PMS 3.png";
export default function AuthLayout({ imgurl }) {
  return (
    <div
      className="auth-container"
      style={{ backgroundImage: `url(${imgurl})` }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center vh-100 ">
          <div className="logo">
            <img src={logo} alt="auth_logo" style={{width:'300px' , color:'#fff'}} />
          </div>
          <div className="col-lg-5 p-5 cont">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
