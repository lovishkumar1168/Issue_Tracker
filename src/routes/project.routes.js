import express from "express";
import { ProjectController } from "../controllers/project.controller.js";

export const projectRouter = express.Router();
const projectController = new ProjectController();

/* route for rendering project form */
projectRouter.get("/createProject",(req,res,next)=>{
    projectController.renderAddProjectForm(req,res,next);
})

/* route for creating project form */
projectRouter.post("/createProject",(req,res,next)=>{
    projectController.postAddProject(req,res,next);
})

/* route for rendering create issue form */
projectRouter.get("/createIssue/:id",(req,res,next)=>{
    projectController.renderCreateIssueForm(req,res,next);
})

/* route for creating issue form */
projectRouter.post("/createIssue/:id",(req,res,next)=>{
    projectController.postCreateIssue(req,res,next);
})

/* route for rendering project details page*/
projectRouter.get("/project-details/:id",(req,res,next)=>{
    projectController.renderProjectDetailsPage(req,res,next);
})

/* route for filtering issue on project details page*/
projectRouter.post("/project-details/:id",(req,res,next)=>{
    projectController.postProjectDetailsPage(req,res,next);
})

/* route for getting all projects basically home page*/
projectRouter.get("/",(req,res,next)=>{
    projectController.getProjects(req,res,next);
})
