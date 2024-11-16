import { useForm } from "react-hook-form";
// import logo from "../../../../assets/1.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../../../../App.css";
import baseUsersAuth from "../../../BaseUrls/BaseUrls";

export default function ResetRequest() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(baseUsersAuth.resetrequest, data);
      toast.success("Check Your Account ");
      console.log(response);
      navigate("/resetpass");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-3">
        <span className="my-3" style={{ color: "#fff", fonrSize: "20px " }}>
          Welocome to PMS
        </span>
        <h2 style={{ color: "#EF9B28" }}> Forget Password </h2>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="my-4">
          <label htmlFor="email" className="orange">
            Email
          </label>
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
        {errors.email && <p className="text-danger">{errors.email.message}</p>}

        <button type="submit" className="d-block mt-5 auth_login">
          Verify
        </button>
      </form>
    </>
  );
}
