const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const bmiRoutes = require("./routes/bmi.route");
const glucoseRoutes = require("./routes/glucose.route");
const bloodPressureRoutes = require("./routes/bloodPressure.route");
const healthRoutes = require("./routes/health.route");
const doctorRoutes = require("./routes/doctor.route");
const userRoutes = require("./routes/user.route");
const appointmentRoutes = require("./routes/appointment.route");
const blogRoutes = require("./routes/blog.route")
// App Config
const app = express();
//dotenv conffig
dotenv.config();
//Port
const PORT = process.env.PORT || 5000;
// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(morgan("common"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appoinment" , appointmentRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/health/bmi", bmiRoutes);
app.use("/api/health/glucose", glucoseRoutes);
app.use("/api/health/bloodPressure", bloodPressureRoutes);
app.use("/api/health/overall", healthRoutes);
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
