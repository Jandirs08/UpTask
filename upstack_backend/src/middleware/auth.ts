import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; //Nuestra interfaz, que es lo que espera
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    res.status(401).json({ error: error.message });
    return;
  }
  const token = bearer.split(" ")[1];

  try {
    //Verificar el JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      //Revisar que el usuario que tiene el token exista
      const user = await User.findById(decoded.id).select("_id name email");
      if (user) {
        //Para pasar los datos usar req
        req.user = user;
      } else {
        res.status(500).json({ error: "Token no válido" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Token no válido" });
  }
  console.log(token);
  next();
};
