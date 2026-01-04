const API_URL = "http://localhost:5000/api";

export const registerUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getCourses = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/courses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createCourse = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/courses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteCourse = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/courses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
