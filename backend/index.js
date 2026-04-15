import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";


const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "").split(","),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]
  .map((origin) => origin?.trim())
  .filter(Boolean)
  .map((origin) => origin.replace(/\/$/, ""));

const whitelist = new Set(configuredOrigins);
console.log("Allowed CORS origins:", [...whitelist]);

const corsOptions = {
  origin: function (origin, callback) {
    const normalizedOrigin = origin?.replace(/\/$/, "");
    if (!origin || whitelist.has(normalizedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Job Portal backend is running",
  });
});

app.get("/health", (req, res) => {
  return res.status(200).json({ success: true });
});

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
