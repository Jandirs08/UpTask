import { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

/* Para poder modificar el request para que tenga el valor de project
    y así poder compartir los datos en el request entre este middleware
    y el controlador
*/
declare global {
  namespace Express {
    interface Request {
      task: ITask;
    }
  }
}

export async function taskExists(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!taskId) {
      res.status(400).json({ message: "ID no recibido en la URL" });
      return;
    }
    if (!task) {
      res.status(404).json({ message: "Tarea no encontrado" });
      return;
    }
    req.task = task;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}

export function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
  if (req.task.project.toString() !== req.project.id.toString()) {
    const error = new Error("Acción no válida");
    res.status(400).json({ error: error.message });
    return;
  }
  next();
}

export function hasAuthorization(req: Request, res: Response, next: NextFunction) {
  if (req.user.id.toString() !== req.project.manager.toString()) {
    const error = new Error("Acción no válida");
    res.status(400).json({ error: error.message });
    return;
  }
  next();
}
