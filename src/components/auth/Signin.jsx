import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "@js/index";
import { login } from "@store/authSlice";

const Signin = () => {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    const user = await authService.signIn(data);
    if (user) {
      dispatch(login({ ...user }));
      navigate("/chat");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="group focus-within:text-yellow-500">
        <label
          htmlFor="email"
          className="text-gray-400 group-focus-within:text-yellow-500"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 text-white border border-gray-400 rounded-lg focus:outline-none focus:border-yellow-500"
        />
        {errors.email && (
          <p className="text-red-400 text-sm mt-1">Email is required</p>
        )}
      </div>

      <div className="group focus-within:text-yellow-500">
        <label
          htmlFor="password"
          className="text-gray-400 group-focus-within:text-yellow-500"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", { required: true })}
          className="w-full px-4 py-2 text-white border border-gray-400 rounded-lg focus:outline-none focus:border-yellow-500"
        />
        {errors.password && (
          <p className="text-red-400 text-sm mt-1">Password is required</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded-lg transition cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#1A2980] hover:bg-[#1A4890]"
        }`}
      >
        Sign In
      </button>
      <p className="text-center text-white">or</p>
      <div className="w-full flex justify-center text-black font-medium">
        <button className="text-white w-full flex gap-2 justify-center border border-gray-400 py-2 px-4 rounded-md cursor-pointer">
          <img 
          className="w-5 h-5"
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google" 
          /> Continue with Google
        </button>
      </div>
    </form>
  );
};

export default Signin;
