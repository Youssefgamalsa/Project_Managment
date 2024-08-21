import { Outlet } from "react-router-dom";

export default function AuthLayout({imgurl}) {
  return (
    <div className="auth-container" style={{backgroundImage:`url(${imgurl})`}}>
      <div className="container-fluid up_container">
        <div className="row justify-content-center align-items-center vh-100 up ">
          <div className="col-lg-5 p-5 cont">
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
