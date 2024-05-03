import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
        type : String,
    },
    labels :{
        type : String,
    },
    author : {
        type : String,
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    }
})

export const IssueModel = mongoose.model("Issue",issueSchema);