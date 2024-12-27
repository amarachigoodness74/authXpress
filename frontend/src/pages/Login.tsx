import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginError, LoginResponse } from "../interfaces/user";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.REACT_APP_API}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Save the token in local storage for authentication
      localStorage.setItem("token", response.data.token);

      const data = response.data;
      navigate("/dashboard");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        // Extract error message from server response
        const errorMessage = (error.response.data as LoginError).error;
        throw new Error(errorMessage);
      }
      throw new Error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
