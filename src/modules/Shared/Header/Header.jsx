import { useContext } from "react";
import "./Header.css";
import {AuthContext} from '../../../context/AuthContext'
export default function Header() {
  const { userData } = useContext(AuthContext);
  return (
    <>
      <div className="headerContainer mx-2 my-3 p-5">
        <div className="row">
          <div className="col-md-5">
            <div className="title">
              <h2
                style={{
                  fontSize: "36px",
                  lineHeight: "43.88px",
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                Welcome{" "}
                <span style={{ color: "rgba(239, 155, 40, 1)" }}>
                  {userData?.userName}
                </span>
              </h2>
              <p
                style={{
                  maxWidth: "754px",
                  fontSize: "20px",
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                You can add project and assign tasks to your team
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
