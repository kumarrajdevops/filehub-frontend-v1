import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      await login(username, password);
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
