import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config(); //Para usar el .env
connectDB(); //llamar la función
const app = express();
app.use(express.json());

//Routes
app.use("/api/projects", projectRoutes);

export default app;
