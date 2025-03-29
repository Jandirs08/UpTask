import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import express from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";
import morgan from "morgan";

dotenv.config(); //Para usar el .env
connectDB(); //llamar la función
const app = express();
app.use(cors(corsConfig));

//Logging con morgan
app.use(morgan("dev"));
//leer datos  de formularios)
app.use(express.json());

//Routes
app.use("/api/projects", projectRoutes);

export default app;
