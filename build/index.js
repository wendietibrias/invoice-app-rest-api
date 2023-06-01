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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./database/connection"));
const mongoose_1 = __importDefault(require("mongoose"));
//route 
const Auth_1 = __importDefault(require("./router/Auth"));
const Invoice_1 = __importDefault(require("./router/Invoice"));
//config
dotenv_1.default.config({ debug: true, path: __dirname + "/.env.development" });
//setup variable
const port = 8000;
const app = (0, express_1.default)();
//use 
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}));
//use router
app.use('/api/auth', Auth_1.default);
app.use("/api/invoice", Invoice_1.default);
//run server
mongoose_1.default.connection.on('error', (err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err) {
        console.log(`server is error`);
    }
}));
(0, connection_1.default)(app, port);
