import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//routes
import companyRoutes from "../api/routes/company.routes.js";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongodb server");
  } catch (err) {
    console.log(err);
  }
};

//middleware
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://impact-shaala.web.app/", credentials: true }));

//routes
app.use("/api/company", companyRoutes);

app.listen(8000, () => {
  connect();
  console.log("server started on post 8000");
});
