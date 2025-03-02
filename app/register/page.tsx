"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !age || !sex || !weight || !height || !bloodPressure || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const passwordHash = bcrypt.hashSync(password, 10);
      console.log({ name, age, sex, weight, height, bloodPressure, email, passwordHash });
      alert("Registration successful!");
      router.push("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleRegister} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {[
          { label: "ชื่อ - นามสกุล", state: name, setState: setName, type: "text" },
          { label: "อายุ", state: age, setState: setAge, type: "number" },
          { label: "เพศ", state: sex, setState: setSex, type: "text" },
          { label: "น้ำหนัก (กิโลกรัม)", state: weight, setState: setWeight, type: "number" },
          { label: "ส่วนสูง (เซนติเมตร)", state: height, setState: setHeight, type: "number" },
          { label: "ความดันโลหิต", state: bloodPressure, setState: setBloodPressure, type: "text" },
          { label: "Email", state: email, setState: setEmail, type: "email" },
          { label: "Password", state: password, setState: setPassword, type: "password" },
        ].map(({ label, state, setState, type }) => (
          <div key={label} className="mb-4">
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
