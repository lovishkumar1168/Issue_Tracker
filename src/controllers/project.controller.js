import { ProjectRepository } from "../repository/project.repository.js";

export class ProjectController{
    constructor()
    {
        this.projectRepository = new ProjectRepository();
    }

    /* function for rendering addProjectForm */
    async renderAddProjectForm(req,res,next)
    {
        res.render("addProject");
    }

    /* function for posting data in database after submitting form*/
    async postAddProject(req,res,next)
    {
        try{
            const newProject = await this.projectRepository.newProject(req.body);
            return res.redirect("/");
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /* Function for getting all projects */
    async getProjects(req,res,next)
    {
        try{
            const projects = await this.projectRepository.getAll();
            res.render("projects",{projects});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /* Function for rendering the create issue form */
    async renderCreateIssueForm(req,res,next)
    {
       const projectId = req.params.id;
       const project = await this.projectRepository.get(projectId);
       res.render("createIssue",{project});
    }

    /* Function for posting a new issue */
    async postCreateIssue(req,res,next)
    {
        try{
            const projectId = req.params.id;
            await this.projectRepository.newIssue(req.body,projectId);
            return res.redirect("/");
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /*function for renderering the project details page*/
    async renderProjectDetailsPage(req,res,next)
    {
        try{
            const projectId = req.params.id;
            const project = await this.projectRepository.get(projectId);
            res.render("projectDetails",{project,issues : project.issues});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /*function for filtering the issue and displayed on project details page*/
    async postProjectDetailsPage(req,res)
    {
        const projectId = req.params.id;
        const project = await this.projectRepository.get(projectId);
        let {filterLabels,filterAuthor,searchValue} = req.body;
        const filterIssues = await this.projectRepository.filter(filterLabels,filterAuthor,searchValue,projectId);
        res.render("projectDetails",{project,issues: filterIssues});
    }
}