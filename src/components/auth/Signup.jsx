import { useForm } from "react-hook-form";
import { useState } from "react";
import { authService } from "@js/index"; 

const Signup = ({switchSignIn}) => {

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const onSubmit = async (data) => {
    setLoading(true);
    const signup = await authService.signUp(data);
    if(signup){
      setTimeout(() => {
        switchSignIn();
      }, 1500);
    }
    setLoading(false);
  };
  
  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="group focus-within:text-yellow-500">
        <label htmlFor="username" className="text-gray-400 group-focus-within:text-yellow-500">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Enter Your Username"
          {...register("username", { required: true })}
          className="w-full px-4 py-2 text-white border border-gray-400 rounded-lg focus:outline-none focus:border-yellow-500"
        />
        {errors.username && <p className="text-red-400 text-sm mt-1">Username is required</p>}
      </div>

      <div className="group focus-within:text-yellow-500">
        <label htmlFor="email" className="text-gray-400 group-focus-within:text-yellow-500">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter Your Email"
          {...register("email", { required: true })}
          className="w-full px-4 py-2 text-white border border-gray-400 rounded-lg focus:outline-none focus:border-yellow-500"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">Email is required</p>}
      </div>

      <div className="group focus-within:text-yellow-500">
        <label htmlFor="password" className="text-gray-400 group-focus-within:text-yellow-500">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", { required: true, minLength: 8 })}
          className="w-full px-4 py-2 text-white border border-gray-400 rounded-lg focus:outline-none focus:border-yellow-500"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">Min length 8 characters</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white py-2 rounded-lg transition cursor-pointer ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1A2980] hover:bg-[#1A4890]"
        }`}
      >
        Sign Up
      </button>
     
    </form>
  );
};

export default Signup;
