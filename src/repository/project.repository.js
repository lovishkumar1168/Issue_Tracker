import { IssueModel } from "../schema/issue.schma.js";
import { ProjectModel } from "../schema/project.schema.js";

export class ProjectRepository{

    /* Function for creating a new project */
    async newProject(newProjectData)
    {
        try{
            const newProject = new ProjectModel(newProjectData);
            const savedProject = await newProject.save();
            return savedProject;
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /* Function for creating a new issue associated with a project */
    async newIssue(newIssueData,projectId)
    {
        try{
            const newIssue = new IssueModel({...newIssueData,project: projectId});
            await newIssue.save();
            await ProjectModel.findByIdAndUpdate(projectId,{$push : {issues : newIssue._id}});
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /* Function for getting all projects */
    async getAll()
    {
        try{
           return await ProjectModel.find();
        }
        catch(err)
        {
            console.log(err);
        }
    }

    /* Function for getting a specific project by ID */
    async get(projectId)
    {
        try{
            return await ProjectModel.findById(projectId).populate("issues");
        }
        catch(err)
        {
            console.log(err);
        }
    }
    
    /* function for filtering issues by label,author and also search issue by issue title,description*/
    async filter(labels,author,searchValue,projectId)
    {
        try{
            if(labels && labels.length)
                return await IssueModel.find({project : projectId,labels : {$in : labels}});
            
            if(author && author.trim()!=='')
                return await IssueModel.find({project : projectId,author : {$regex : author, $options : 'i'}});

            if(searchValue.trim() !== '' && searchValue)
            {
                const issues = await IssueModel.find({project : projectId});
                return issues.filter((issue)=>{
                    return issue.title.toLowerCase().includes(searchValue.toLowerCase()) || issue.description.toLowerCase().includes(searchValue.toLowerCase());
                })
            }     
        }
        catch(err)
        {
            console.log(err);
        }
    }
}