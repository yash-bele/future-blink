import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { setToken } from "../store/appSlice";
import { useRegisterUserMutation } from "../store/api";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [registerUser, { isLoading, isError, isSuccess, data, error }] = useRegisterUserMutation();

  const handleChange = (param) => (e) => setInputs({ ...inputs, [param]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(inputs);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
      localStorage.setItem("token", data);
      navigate("/app");
    } else if (isError) {
      toast.error("Invalid credentials!");
      console.log(error);
    }
  }, [isError, isSuccess]);

  return (
    <div className="bg-white shadow rounded-xl px-8 py-6 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-4 text-blue-400">Register!</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            value={inputs.email}
            onChange={handleChange("email")}
            type="email"
            id="email"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            value={inputs.password}
            onChange={handleChange("password")}
            type="text"
            id="password"
            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
          <a href="" className="text-xs text-gray-600 hover:text-indigo-500">
            Forgot Password?
          </a>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" defaultChecked />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <Link to="/" className="text-sm font-semibold text-indigo-500 hover:text-indigo-700">
            Login
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`disabled:cursor-not-allowed w-full flex justify-center items-center h-10 border border-transparent rounded-md text-lg shadow-sm font-medium text-white ${isLoading ? "bg-indigo-300" : "bg-indigo-500 hover:bg-indigo-600"}`}
        >
          {isLoading ? <Icon icon="icomoon-free:spinner9" width={24} className="animate-spin" /> : "Register"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} theme="light" />
    </div>
  );
}
