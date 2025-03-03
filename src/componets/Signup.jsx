import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Logo, Button, Input } from '../componets/index';
import { Login } from '../store/authSlice';
import authentication from '../appwrite/authservices'; // Make sure this file is correctly configured

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const signup = async (data) => {
        setError(''); // Clear previous error
        try {
            const userData = await authentication.createAccount(data);

            if (userData) {
                const currentUser = await authentication.getUser();

                if (currentUser) {
                    dispatch(Login(currentUser));
                    navigate('/'); // Navigate to home after successful signup
                }
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="mx-auto w-full max-w-lg bg-white rounded-xl shadow-md p-10 border border-gray-200">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                    <div className="w-24">
                        <Logo width="100%" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Sign up to create an account
                </h2>

                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>

                {/* Error Message */}
                {error && (
                    <p className="mt-4 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                {/* Signup Form */}
                <form className="mt-6 space-y-5" onSubmit={handleSubmit(signup)}>
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register("name", { required: "Full Name is required" })}
                    />
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                message: "Please enter a valid email address"
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", { required: "Password is required" })}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
