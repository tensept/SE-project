"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

// const [checkUser, setCheckUser] = useState(false);
const users = [
  {
    email: "user@example.com",
    passwordHash: bcrypt.hashSync("password123", 10), // Hashed password
  },
];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const user = users.find((u) => u.email === email);
      if (user && bcrypt.compareSync(password, user.passwordHash)) {
        router.push("/dashboard"); // Redirect on successful login
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  const handleRegister = async () => {
    router.push("/register"); // Navigate to the registration page
  };

  const handleForgotPassword = async () => {
    router.push("/forgot-password"); // Navigate to the forgot password page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
            type="button"
            onClick={handleForgotPassword}
            className="text-pink-500 hover:underline py-1"
          >
            Forgot Password?
          </button>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
        <div className="mt-4 flex ">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleRegister}
            className="text-pink-500 hover:underline px-1"
          >
            Register
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
