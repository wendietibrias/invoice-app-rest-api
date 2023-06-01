//third party module
import { Request,Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//built in module
import { IRequest } from "../interfaces/ExpressInterface";
import User, { findUserById } from "../schemas/User"; 
import { findUserByEmail } from "../schemas/User";
import ResponseError from "../utils/ResponseError";
import ResponseSuccess from "../utils/ResponseSuccess";

//setup variable
const jwtSecret : string = 'auth';
const saltBcrypt : number = 10;

const Login = async (req : Request , res : Response) => {

    const { 
       email,
       password
    } = req.body;

    try {
         //cek jika akun user itu ada

         const findUser = await findUserByEmail(email);

         if(!findUser) {
           return ResponseError(400 , res, "account is not found");
         }

         //cek jika ada lebih dari 1 user yang login 
         if(findUser.login_token !== "") {
             return ResponseError(403, res, "Akun tidak dapat digunakan oleh lebih dari 1 orang penguna");
         }

         bcrypt.compare(password, findUser.password,  (err, result) => {
              if(err) {
                return ResponseError(500 , res, "Internal server error");
              }

              if(result) {
                  return jwt.sign(
                    { _id:findUser._id } ,
                     `${process.env.SECRET_JWT}`, 
                    { algorithm:"HS256" },
                      async (err,token) => {
                      if(token) {
                        findUser.login_token = token;
                        await findUser.save(); 

                         return res.status(200).json({
                             request_token:token,
                             request_time:new Date().toDateString(),
                             status:200
                         });
                      }

                      return ResponseError(500 , res, "Internal server error");
                 });
              }

              return ResponseError(401, res, "Authentication fail");
         });

     } catch(err : any) {
        return ResponseError(500 ,res, err.message);
     } 
}

const Register = async (req : Request , res : Response) => {
     const { 
        username,
        email,
        password,
        confirm
     } = req.body;

     if(username === "" && email === "" && password === "" && confirm === "") {
        return ResponseError(400 , res , "please complete all field");
     }

     try {
        //cek jika akun user ada 
        const findUser = await findUserByEmail(email);
  
        if(findUser) {
            return ResponseError(400, res, "Account already exists");
        }

        //cek jika password dan confirm sama;
        if(password !== confirm) {
            return ResponseError(400 , res, "Password is not match");
        }

        const initUser = new User({
              email,
              username,

        });

        //bandingkan password dengan bcrypt 
        bcrypt.genSalt(saltBcrypt , (err,salt : string) => {
 
            if(err) {
                return ResponseError(500 ,  res, "Internal server error")
            }

              bcrypt.hash(password , salt , async (err, hash : string) => {
                 if(err) {
                     return ResponseError(500 , res, "Internal server error");
                 }

                     if(hash) {
                        initUser.password = hash;
                        const saved = await initUser.save();
                        
                        if(saved) return ResponseSuccess(200,res,"success create account");
                     }
              });
        });
        

     } catch(err : any) {
        return ResponseError(500 ,res, err.message);
     }
}

const Logout = async (req : IRequest , res : Response) => {
    const userId = req.userId;

    if(!userId) {
        return ResponseError(401, res, "Unauthorized");
    }

    try {
      const findUser = await findUserById(userId);
      
      if(!findUser) {
         return ResponseError(400 , res, "account is not found")
      }

      findUser.login_token = "";

      const savedUser = await findUser.save();


      if(savedUser) {
         return ResponseSuccess(200 , res, "success logout");
      }

      return ResponseError(400 , res, "failed while logout from this account");

    } catch(err : any) {
        return ResponseError(500 , res, err.message);

    }
}

export { 
    Login ,
    Register,
    Logout
}