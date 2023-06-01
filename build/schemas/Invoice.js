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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findInvoiceByUserId = exports.findInvoiceById = exports.findAllInvoice = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const invoiceSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
        ref: 'users'
    },
    billFrom: {
        address: String,
        city: String,
        zipCode: String,
        country: String
    },
    billTo: {
        address: String,
        city: String,
        zipCode: String,
        country: String,
        paymentDate: {
            type: String,
            required: true
        },
        paymentDue: {
            type: String,
            required: true
        },
        clientEmail: {
            type: String,
        },
        clientName: {
            type: String
        },
        amount: {
            type: Number
        },
        status: {
            type: String,
            enum: ['Pending', 'Draft', 'Paid']
        },
        paymentTerms: {
            type: String
        },
        productDescription: {
            type: String
        },
    },
    items: {
        type: [
            {
                qty: Number,
                itemName: String,
                total: Number,
                price: Number
            }
        ],
        default: []
    },
});
const invoiceModel = mongoose_1.default.model('invoice', invoiceSchema);
const findAllInvoice = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield invoiceModel.find({ user_id: id }); });
exports.findAllInvoice = findAllInvoice;
const findInvoiceById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield invoiceModel.findById(id); });
exports.findInvoiceById = findInvoiceById;
const findInvoiceByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield invoiceModel.findOne({ user_id: userId }); });
exports.findInvoiceByUserId = findInvoiceByUserId;
exports.default = invoiceModel;
