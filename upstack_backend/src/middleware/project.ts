import { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

/* Para poder modificar el request para que tenga el valor de project
    y así poder compartir los datos en el request entre este middleware
    y el controlador
*/
declare global {
  namespace Express {
    interface Request {
      project: IProject;
    }
  }
}

export async function ProjectExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      res.status(400).json({ message: "ID no recibido en la URL" });
      return;
    }
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
