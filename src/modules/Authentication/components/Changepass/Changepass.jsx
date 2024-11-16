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
      let response = await axios.put(baseUsersAuth.changepass, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      console.log(response);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="my-3">
        <span className="my-3" style={{color:'#fff' , fonrSize:'20px '}}>Welocome to PMS</span>
        <h2 style={{ color: "#EF9B28" }}> Change Password </h2>
      </div>
      <form className="p-1" onSubmit={handleSubmit(submtion)}>
        <div className="my-4">
          <label htmlFor="old_password" className="orange">
            Old Password
          </label>
          <input
            type="password"
            placeholder="Enter Old Password "
            aria-label="old_password"
            aria-describedby="addon-wrapping"
            {...register("oldPassword", {
              required: "oldPassword is Required ",
            })}
          />
        </div>
        {errors.oldPassword && (
          <p className="text-danger text-left"> {errors.oldPassword.message}</p>
        )}{" "}
        <div className=" my-4">
          <label htmlFor="new_password" className="orange">
            {" "}
            Add New Password{" "}
          </label>
          <input
            type="password"
            placeholder="Enter New Password "
            aria-label="new_password"
            aria-describedby="addon-wrapping"
            {...register("newPassword", {
              required: "newPassword is Required ",
            })}
          />
        </div>
        {errors.newPassword && (
          <p className="text-danger text-left">{errors.newPassword.message}</p>
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
            {...register("confirmNewPassword", {
              required: "confirmNewPassword is Required ",
            })}
          />
        </div>
        {errors.confirmNewPassword && (
          <p className="text-danger text-left">
            {errors.confirmNewPassword.message}
          </p>
        )}
        <button type="submit" className="d-block my-4 auth_login">
          Save
        </button>
      </form>
    </>
  );
}
