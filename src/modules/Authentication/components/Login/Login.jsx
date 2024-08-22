import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {  useState } from "react";
import "../../../../App.css";
import baseUsersAuth from "../../../BaseUrls/BaseUrls";
export default function Login() {
  let navigate = useNavigate();
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(true);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/dashboard");
  //   }
  // });

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(baseUsersAuth.login, data);
      toast.success("Login successfully");
      console.log(response);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-3">
        <span className="white my-3">Welocome to PMS</span>
        <h2 style={{ color: "#EF9B28" }}> Login </h2>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="my-4">
          <input
            type="email"
            placeholder="Enter Your Email "
            aria-label="email"
            aria-describedby="addon-wrapping"
            {...register("email", {
              required: "Email is Required ",
              pattern: {
                value: "",
                message: "Email should be valid Email ",
              },
            })}
          />
        </div>
        {errors.email && (
          <p className="text-danger text-left"> {errors.email.message}</p>
        )}{" "}
        <div className="input-group flex-nowrap my-4">
          <input
            type={isPasswordVisibile ? "text" : "password"}
            placeholder="Enter Your Password "
            aria-label="password"
            aria-describedby="addon-wrapping"
            {...register("password", {
              required: "Password is Required ",
            })}
          />
          <span
            onClick={() => setIsPasswordVisibile(!isPasswordVisibile)}
            id="addon-wrapping"
          >
            <i
              className={`white fa ${
                isPasswordVisibile ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </span>
        </div>
        {errors.password && (
          <p className="text-danger text-left">{errors.password.message}</p>
        )}
        <div className="links d-flex justify-content-between align-items-center my-5">
          <Link to="/register" className="white">
            Register Now ?
          </Link>
          <Link to="/forgetpass" className="white">
            Forget password ?
          </Link>
        </div>
        <button type="submit" className="d-block my-3 auth_login">
          Login
        </button>
      </form>
    </>
  );
}
