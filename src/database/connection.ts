import mongoose from "mongoose";
import { Express } from "express";

const connection = async (app : any , port : number) => {
    const connect = await mongoose.connect(`${process.env.MONGO_URI}`);

    if(connect) {
        return app.listen(port, () => console.log(`server is running on port : ${port}`));
    }
} 

export default connection ;