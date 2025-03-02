import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";

interface FormProps {
  mode: "login" | "register";
}

const UsernamePasswordForm: React.FC<FormProps> = ({ mode }) => {
  const { setUser, setToken } = useUser();
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setUsername(""); // Reset username and password when mode changes
    setPassword("");
  }, [mode]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const url = mode === "login" ? "http://localhost:1234/patientAuth/login" : "http://localhost:1234/patientAuth/register";
    const method = mode === "login" ? "POST" : "POST"; // Use POST for both

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access_token);
      setToken(data.access_token);
      setUser(data.profile);

      setError(""); // Clear any previous errors
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">{mode === "login" ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {loading ? `${mode === "login" ? "Logging in..." : "Registering..."}` : mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default UsernamePasswordForm;
