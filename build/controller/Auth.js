"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Register = exports.Login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importStar(require("../schemas/User"));
const User_2 = require("../schemas/User");
const ResponseError_1 = __importDefault(require("../utils/ResponseError"));
const ResponseSuccess_1 = __importDefault(require("../utils/ResponseSuccess"));
//setup variable
const jwtSecret = 'auth';
const saltBcrypt = 10;
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        //cek jika akun user itu ada
        const findUser = yield (0, User_2.findUserByEmail)(email);
        if (!findUser) {
            return (0, ResponseError_1.default)(400, res, "account is not found");
        }
        //cek jika ada lebih dari 1 user yang login 
        if (findUser.login_token !== "") {
            return (0, ResponseError_1.default)(403, res, "Akun tidak dapat digunakan oleh lebih dari 1 orang penguna");
        }
        bcrypt_1.default.compare(password, findUser.password, (err, result) => {
            if (err) {
                return (0, ResponseError_1.default)(500, res, "Internal server error");
            }
            if (result) {
                return jsonwebtoken_1.default.sign({ _id: findUser._id }, `${process.env.SECRET_JWT}`, { algorithm: "HS256" }, (err, token) => __awaiter(void 0, void 0, void 0, function* () {
                    if (token) {
                        findUser.login_token = token;
                        yield findUser.save();
                        return res.status(200).json({
                            request_token: token,
                            request_time: new Date().toDateString(),
                            status: 200
                        });
                    }
                    return (0, ResponseError_1.default)(500, res, "Internal server error");
                }));
            }
            return (0, ResponseError_1.default)(401, res, "Authentication fail");
        });
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.Login = Login;
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confirm } = req.body;
    if (username === "" && email === "" && password === "" && confirm === "") {
        return (0, ResponseError_1.default)(400, res, "please complete all field");
    }
    try {
        //cek jika akun user ada 
        const findUser = yield (0, User_2.findUserByEmail)(email);
        if (findUser) {
            return (0, ResponseError_1.default)(400, res, "Account already exists");
        }
        //cek jika password dan confirm sama;
        if (password !== confirm) {
            return (0, ResponseError_1.default)(400, res, "Password is not match");
        }
        const initUser = new User_1.default({
            email,
            username,
        });
        //bandingkan password dengan bcrypt 
        bcrypt_1.default.genSalt(saltBcrypt, (err, salt) => {
            if (err) {
                return (0, ResponseError_1.default)(500, res, "Internal server error");
            }
            bcrypt_1.default.hash(password, salt, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return (0, ResponseError_1.default)(500, res, "Internal server error");
                }
                if (hash) {
                    initUser.password = hash;
                    const saved = yield initUser.save();
                    if (saved)
                        return (0, ResponseSuccess_1.default)(200, res, "success create account");
                }
            }));
        });
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.Register = Register;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    try {
        const findUser = yield (0, User_1.findUserById)(userId);
        if (!findUser) {
            return (0, ResponseError_1.default)(400, res, "account is not found");
        }
        findUser.login_token = "";
        const savedUser = yield findUser.save();
        if (savedUser) {
            return (0, ResponseSuccess_1.default)(200, res, "success logout");
        }
        return (0, ResponseError_1.default)(400, res, "failed while logout from this account");
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.Logout = Logout;
