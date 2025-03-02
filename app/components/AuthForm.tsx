import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

interface AuthFormProps {
  mode: "login" | "register";
  userType: "patient" | "doctor"; // Determines if it's for patients or doctors
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, userType }) => {
  const { setUser, setToken } = useUser();
  const [error, setError] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>(""); // Username or Email
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIdentifier(""); 
    setPassword("");
  }, [mode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const path = process.env.NEXT_PUBLIC_BACK_END;
    const url = `${path}/${userType}Auth/${mode}`;
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [userType === "doctor" ? "email" : "username"]: identifier, 
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access_token);
      setToken(data.access_token);
      setUser(data.profile);

      setError("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {mode === "login" ? "Login" : "Register"} as {userType}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium">
            {userType === "doctor" ? "Email" : "Username"}
          </label>
          <input
            type={userType === "doctor" ? "email" : "text"}
            id="identifier"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {loading ? (mode === "login" ? "Logging in..." : "Registering...") : mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
