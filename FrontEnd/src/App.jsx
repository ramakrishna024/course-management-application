import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./Pages/Register";
import Courses from "./Pages/Courses";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login setToken={setToken} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/courses"
          element={token ? <Courses setToken={setToken} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
