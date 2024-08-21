import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {} from "react";
import "../../../../App.css";
import baseUsersAuth from "../../../BaseUrls/BaseUrls";
export default function Verify() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.put(
       baseUsersAuth.verify,
        data
      );
      toast.success("Verified Account Successfully");
      console.log(response);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-3">
        <span className="white my-3">Welocome to PMS</span>
        <h2 style={{ color: "#EF9B28" }}> Verify Account </h2>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="my-4">
          <label className="orange">Email </label>
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
        )}
        <div className="my-4">
          <label htmlFor="OTP" className="orange">
            OTP Validation{" "}
          </label>
          <input
            type="text"
            placeholder="Enter Verification "
            aria-label="OTP"
            aria-describedby="addon-wrapping"
            {...register("code", {
              required: "code is Required ",
            })}
          />
        </div>
        {errors.code && (
          <p className="text-danger text-left">{errors.code.message}</p>
        )}
        <button type="submit" className="d-block my-3 auth_login">
          Save
        </button>
      </form>
    </>
  );
}
