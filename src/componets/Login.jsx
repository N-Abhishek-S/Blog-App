import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authentication from "../appwrite/authservices";
import { useForm } from "react-hook-form";
import { Logo, Input, Button } from "../componets/index";
import { useDispatch } from "react-redux";
import { Login as authLogin } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    console.log("Successfully logged in");
    setError("");
    try {
      const session = await authentication.Login(data);
      if (session) {
        const userData = await authentication.getUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          console.log("Error in Login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-300">
      <div className="bg-white/60 backdrop-blur-lg shadow-lg rounded-2xl p-8 sm:p-10 border border-gray-200 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo className="w-24" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Sign in to your account
        </h2>
        <p className="text-gray-600 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline transition"
          >
            SingIn
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-5">
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            className="w-full"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    value
                  ) || "Invalid email format",
              },
            })}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            label="Password"
            className="w-full"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg shadow-md">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
