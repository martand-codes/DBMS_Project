import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../Api/axios";

const Register = ({ setToken }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        // Register User
        await API.post(
            "/auth/register",
            formData
        );

        // Auto Login
        const response = await API.post(
            "/auth/login",
            {
                email: formData.email,
                password: formData.password
            }
        );

        // Store Token
        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        // Reactive Auth
        setToken(response.data.token);

        navigate("/");

    } catch (err) {

        console.log(err);

        alert("Registration Failed");

    }

};

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Register
                </h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-4"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-3 rounded-lg"
                >
                    Register
                </button>

                <p className="mt-4 text-center">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Register;