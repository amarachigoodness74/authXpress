import React, { useState } from "react";
import { ErrorResponse, SuccessResponse } from "../interfaces/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<string | null>("null");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setAlert(null);

    try {
      setError(null);
      const { data } = await axios.post<SuccessResponse>(
        `${process.env.REACT_APP_API}/auth/reset-password`,
        { password },
        { headers: { "Content-Type": "application/json" } }
      );
      setAlert(data.message);
    } catch (error: any) {
      setAlert(null);
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as ErrorResponse).error;
        setError(errorMessage);
      }
      throw new Error("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {alert && <p className="text-center text-green-500 text-sm">{alert}</p>}
        {error && <p className="text-center text-red-500 text-sm">{error}</p>}
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
          Reset Password
        </button>
        <div className="text-right text-sm mt-4">
          <p>
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

export default ResetPassword;
