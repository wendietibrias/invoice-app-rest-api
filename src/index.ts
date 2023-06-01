import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./database/connection";
import mongoose from "mongoose";

//route 
import authRoutes from "./router/Auth";
import invoiceRoutes from "./router/Invoice";

//config
dotenv.config({ debug:true, path:__dirname + "/.env.development" });

//setup variable
const port : number = 8000;
const app  = express();

//use 
app.use(express.json());
app.use(cors({
    origin:"*",
    methods:['GET' , 'POST' , 'PATCH'  ,'PUT' , 'DELETE']
}));

//use router
app.use('/api/auth' , authRoutes);
app.use("/api/invoice" , invoiceRoutes);

//run server
mongoose.connection.on('error' , async (err) => {
     if(err) {
         console.log(`server is error`)
     } 

});
 
connection(app,port); 
