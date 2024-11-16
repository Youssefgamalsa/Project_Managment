import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUsersAuth from "../../../BaseUrls/BaseUrls";

export default function ResetPass() {
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let submtion = async (data) => {
    try {
      let response = await axios.post(baseUsersAuth.reset, data);
      toast.success("Reset Password successfully");
      console.log(response);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-3">
        <span className="my-3" style={{color:'#fff' , fonrSize:'20px '}} >Welocome to PMS</span>
        <h2 style={{ color: "#EF9B28" }}> Reset Request </h2>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="my-4">
          <label htmlFor="email" className="orange">
            {" "}
            Email{" "}
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
        {errors.email && (
          <p className="text-danger text-left"> {errors.email.message}</p>
        )}{" "}
        <div className="my-4">
          <label htmlFor="Verification" className="orange">
            OTP Verification{" "}
          </label>
          <input
            type="text"
            placeholder="Enter Verification "
            aria-label="Verification"
            aria-describedby="addon-wrapping"
            {...register("seed", {
              required: "seed is Required ",
            })}
          />
        </div>
        {errors.seed && (
          <p className="text-danger text-left"> {errors.seed.message}</p>
        )}{" "}
        <div className=" my-4">
          <label htmlFor="password" className="orange">
            {" "}
            Add New Password{" "}
          </label>
          <input
            type={"password"}
            placeholder="Enter Your Password "
            aria-label="password"
            aria-describedby="addon-wrapping"
            {...register("password", {
              required: "Password is Required ",
            })}
          />
        </div>
        {errors.password && (
          <p className="text-danger text-left">{errors.password.message}</p>
        )}
        <div className=" my-4">
          <label htmlFor="confirm_password" className="orange">
            Confirm Password{" "}
          </label>
          <input
            type={"password"}
            placeholder="Confirm New Password"
            aria-label="confirm_password"
            aria-describedby="addon-wrapping"
            {...register("confirmPassword", {
              required: "confirmPassword is Required ",
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-danger text-left">
            {errors.confirmPassword.message}
          </p>
        )}
        <button type="submit" className="d-block my-3 auth_login">
          Save
        </button>
      </form>
    </>
  );
}
