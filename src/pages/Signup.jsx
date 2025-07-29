import React from "react";
import { useForm } from "react-hook-form";
import { signup } from "../services/Auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const loadingToastId = toast.loading("Signing in...");
    const response = await signup(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.confirmPassword
    );
    if (response.success == true) {
      reset();
      toast.success(response.message, { id: loadingToastId });
      navigate("/login");
    } else {
      toast.error(response.message, { id: loadingToastId });
    }
  };

  return (
    <div className="h-[94vh] w-full px-10 md:px-20 lg:px-40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[40%] p-5 flex flex-col gap-4 bg-secondary/20 text-primary rounded"
      >
        <h1 className="text-2xl font-semibold text-center">Signup Form</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="p-3 rounded bg-secondary/50 outline-none"
            placeholder="Enter first name"
            id="firstName"
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="p-3 rounded bg-secondary/50 outline-none"
            placeholder="Enter last name"
            id="lastName"
            {...register("lastName", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            className="p-3 rounded bg-secondary/50 outline-none"
            placeholder="Enter email address"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="p-3 rounded bg-secondary/50 outline-none"
            placeholder="Enter password"
            id="password"
            {...register("password", { minLength: 8, required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="p-3 rounded bg-secondary/50 outline-none"
            placeholder="Enter confirm password"
            id="confirmPassword"
            {...register("confirmPassword", { minLength: 8, required: true })}
          />
        </div>
        <input
          type="submit"
          value={"Sign up"}
          className="p-3 bg-primary text-Background cursor-pointer font-semibold rounded active:bg-primary/60"
        />
        <div>
          <Link to={"/login"} className={"text-primary text-sm float-right"}>
            already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
