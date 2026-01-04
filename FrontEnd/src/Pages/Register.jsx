import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await registerUser({ name, email, password });

    if (res.message === "User registered successfully") {
      setMessage("Registration successful. Please login.");
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage(res.message || "Registration failed");
    }
  };

  return (
    <div style={{ padding: 40 }} className="container">
      <h2>Register</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleRegister}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />

        <button type="submit">Register</button>
      </form>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
