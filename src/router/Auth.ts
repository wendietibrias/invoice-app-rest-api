import express, { Request, Router } from "express";
import { Login , Register,Logout } from "../controller/Auth";
import CheckIfAuthenticated from "../middleware/CheckIfAuthenticated";

const router : Router = express.Router();

router.post("/login" , Login);
router.post("/register" , Register);
router.delete('/logout' , CheckIfAuthenticated, Logout);

export default router;