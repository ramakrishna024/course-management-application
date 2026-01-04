const express = require("express");
const cors = require("cors");

require("./database");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
