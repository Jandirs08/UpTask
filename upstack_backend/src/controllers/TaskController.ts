import type { Request, Response } from "express";
import Project from "../models/Project";
import mongoose from "mongoose";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    //Recibe del middleware en el request el project

    try {
      const task = new Task(req.body); //creas con lo que le pasas en el postman
      task.project = req.project.id; // después le agrega el id del proyecto
      req.project.tasks.push(task.id); //Crearlo en el project, al arreglo tasks, el id de nuestro task actual
      await Promise.allSettled([task.save(), req.project.save()]); //Se encarga de que se ejecuten estos dos
      res.send("Proyecto creado correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      //Nombre de la propiedad en el modelo ('project')
      const tasks = await Task.find({ project: req.project.id }).populate("project"); //Es como si fuese un where

      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      //se quiere aplicar el populate en user
      const task = await Task.findById(req.task.id).populate({ path: "completedBy.user", select: "id name email" });

      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      req.task.name = req.body.name;
      req.task.description = req.body.description;
      await req.task.save();
      res.send("Tarea actualizada correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      //Eliminar la referencia en el proyecto
      req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString());
      await Promise.allSettled([req.task.deleteOne(), req.project.save()]);
      res.send("Tarea eliminada correctamente");
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  };

  static updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = req.body;
      req.task.status = status;
      const data = {
        user: req.user.id,
        status
      };
      req.task.completedBy.push(data);
      await req.task.save();
      res.send("Tarea actualizada");
    } catch (error) {
      console.log(error);
    }
  };
}
