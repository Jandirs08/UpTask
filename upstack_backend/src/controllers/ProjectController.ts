import type { Request, Response } from "express";
import Project from "../models/Project";
//En el controlador se llama al modelo
export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body); //Crea una instancia en el Project
    try {
      //OTRA FORMA: await Project.create(req.body);
      await project.save();
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find({});
      res.json(projects); // Enviar la respuesta correctamente
      return;
    } catch (error) {
      console.error("Error obteniendo proyectos:", error);
      res.status(500).json({ message: "Error obteniendo proyectos" });
      return;
    }
  };

  static getProjectByID = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id).populate("tasks");
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }

      res.json(project);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      project.clientName = req.body.clientName;
      project.projectName = req.body.projectName;
      project.description = req.body.description;
      await project.save();
      res.send("Proyecto actualizado");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        const error = new Error("Proyecto no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      await project.deleteOne();
      res.send("Proyecto eliminado");
    } catch (error) {
      console.log(error);
    }
  };
}
