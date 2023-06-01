"use strict";
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ResponseError_1 = __importDefault(require("../utils/ResponseError"));
const User_1 = require("../schemas/User");
const CheckIfAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const actualToken = token.split(" ")[1];
        return jsonwebtoken_1.default.verify(actualToken, `${process.env.SECRET_JWT}`, { algorithms: ["HS256"] }, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return (0, ResponseError_1.default)(500, res, err.message);
            }
            const findUser = yield (0, User_1.findUserById)(decoded === null || decoded === void 0 ? void 0 : decoded._id);
            if (!findUser) {
                return (0, ResponseError_1.default)(401, res, "Access denied!");
            }
            req.userId = decoded === null || decoded === void 0 ? void 0 : decoded._id;
            return next();
        }));
    }
    return (0, ResponseError_1.default)(401, res, "Unauthorized");
};
exports.default = CheckIfAuthenticated;
