import { useEffect, useState } from "react";
import { getCourses, createCourse, deleteCourse } from "../api";
import { useNavigate } from "react-router-dom";

function Courses({ setToken }) {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const navigate = useNavigate();

  const loadCourses = async () => {
    const data = await getCourses();
    if (data.message === "Invalid token") {
      localStorage.removeItem("token");
      setToken(null);
      navigate("/");
    } else {
      setCourses(data);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await createCourse({ name, description, instructor });
    setName("");
    setDescription("");
    setInstructor("");
    loadCourses();
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="courses-container">
      <h2>Courses</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h3>Add Course</h3>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          placeholder="Instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          required
        />

        <button type="submit">Add Course</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>Available Courses</h3>

      {courses.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No courses added yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses.map((c) => (
            <li className="course-item" key={c.id}>
              <div>
                <strong>{c.name}</strong>
                <div style={{ fontSize: "14px", color: "#555" }}>
                  {c.description}
                </div>
                <div style={{ fontSize: "13px", color: "#777" }}>
                  Instructor: {c.instructor}
                </div>
              </div>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Courses;
