import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type:String,
        required:[true, "Email is required"],
        unique:true
    },
    username:{
        type:String,
        required:[true, "username is required"]
    },
    password: {
        type:String,
        required:[true, "password is required"]
    } ,
    login_token: {
        type:String,
        default:"",
    }
});


const userModel =  mongoose.model('user' , userSchema);

export const findUserByEmail = async (email : string) => await userModel.findOne({ email:email });
export const findUserById = async (id : string) => await userModel.findById(id);
export const findUserByLoginToken = async (token : string) => await userModel.findOne({ login_token:token });

export default userModel;