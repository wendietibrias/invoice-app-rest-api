"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../controller/Auth");
const CheckIfAuthenticated_1 = __importDefault(require("../middleware/CheckIfAuthenticated"));
const router = express_1.default.Router();
router.post("/login", Auth_1.Login);
router.post("/register", Auth_1.Register);
router.delete('/logout', CheckIfAuthenticated_1.default, Auth_1.Logout);
exports.default = router;
