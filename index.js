import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { projectRouter } from "./src/routes/project.routes.js";
import { connectToMongoDBUsingMongoose } from "./src/config/mongooseConfig.js";
const server = express();
dotenv.config();

server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),"src","views"));


server.use(expressLayouts);
server.use(express.urlencoded({extended:true}))
server.use(bodyParser.json());

server.use("/",projectRouter);

server.listen(process.env.PORT,()=>{
    console.log("server is listening at 8000");
    connectToMongoDBUsingMongoose();
})