import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
     e.preventDefault();
     setError(null);

     try {
       const response = await axios.post(
         `${process.env.REACT_APP_API}/auth/login`,
         { name, email, password },
         { headers: { "Content-Type": "application/json" } }
       );

       const data = response.data;
       navigate("/login");
     } catch (error: any) {
       if (axios.isAxiosError(error) && error.response) {
         // Extract error message from server response
         const errorMessage = (error.response.data).error;
         throw new Error(errorMessage);
       }
       throw new Error("An unexpected error occurred.");
     }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
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
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
        <div className="text-center text-sm mt-4">
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
