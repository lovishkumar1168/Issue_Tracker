import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    description : {
        type : String,
    },
    author : {
        type : String,
    },
    issues : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Issue"
    }]
})

export const ProjectModel = mongoose.model("Project",projectSchema);