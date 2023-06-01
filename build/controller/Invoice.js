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
exports.updateInvoiceStatus = exports.getInvoice = exports.updateInvoice = exports.createInvoice = exports.deleteInvoice = exports.getAllUserInvoice = void 0;
const Invoice_1 = __importDefault(require("../schemas/Invoice"));
const Invoice_2 = require("../schemas/Invoice");
const ResponseError_1 = __importDefault(require("../utils/ResponseError"));
const ResponseSuccess_1 = __importDefault(require("../utils/ResponseSuccess"));
const getAllUserInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    //cek jika user sudah login
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    try {
        const selectAllInvoice = yield (0, Invoice_2.findAllInvoice)(userId);
        if (selectAllInvoice) {
            return res.status(200).json({
                request_time: new Date().toDateString(),
                data: selectAllInvoice,
                status: 200
            });
        }
        return (0, ResponseError_1.default)(400, res, "Invoice tidak ada");
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.getAllUserInvoice = getAllUserInvoice;
const deleteInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    try {
        const id = req.params.id.trim();
        const findInvoice = yield (0, Invoice_2.findInvoiceById)(id);
        if (findInvoice) {
            const deleteInvoice = yield Invoice_1.default.deleteOne({ _id: req.params.id.trim() });
            if (deleteInvoice) {
                return (0, ResponseSuccess_1.default)(200, res, "success remove invoice");
            }
            return (0, ResponseError_1.default)(400, res, "fail while remove invoice");
        }
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.deleteInvoice = deleteInvoice;
const updateInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { billTo, billFrom, items } = req.body;
    try {
        const id = req.params.id.trim();
        const findInvoice = yield (0, Invoice_2.findInvoiceById)(id);
        if (findInvoice) {
            findInvoice.billTo = billTo;
            findInvoice.billFrom = billFrom;
            findInvoice.items = items;
            const saveInvoice = yield findInvoice.save();
            if (saveInvoice) {
                return (0, ResponseSuccess_1.default)(200, res, "Success update the invoice");
            }
            return (0, ResponseError_1.default)(400, res, "fail while update invoice");
        }
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.updateInvoice = updateInvoice;
const updateInvoiceStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    try {
        const { id } = req.params;
        const { status } = req.query;
        const findInvoice = yield (0, Invoice_2.findInvoiceById)(id);
        if (findInvoice) {
            const updateInvoice = yield Invoice_1.default.findOne({ _id: id }).updateOne({
                billTo: Object.assign(Object.assign({}, findInvoice.billTo), { status: status })
            });
            if (updateInvoice) {
                return (0, ResponseSuccess_1.default)(200, res, "Success update invoice status");
            }
        }
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.updateInvoiceStatus = updateInvoiceStatus;
const createInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    const { billFrom, billTo, items } = req.body;
    try {
        const initInvoice = new Invoice_1.default({
            user_id: userId,
            billTo,
            billFrom,
            items
        });
        const saveInvoice = yield initInvoice.save();
        if (saveInvoice) {
            return (0, ResponseSuccess_1.default)(200, res, "Success creating invoice");
        }
        else {
            return (0, ResponseError_1.default)(400, res, "Fail while create invoice");
        }
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.createInvoice = createInvoice;
const getInvoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return (0, ResponseError_1.default)(401, res, "Unauthorized");
    }
    try {
        const id = req.params.id;
        const findInvoice = yield (0, Invoice_2.findInvoiceById)(id);
        if (!Invoice_2.findInvoiceById) {
            return (0, ResponseError_1.default)(404, res, "Invoice is not found");
        }
        return res.status(200).json({
            message: "Success get invoice",
            status: 200,
            data: findInvoice
        });
    }
    catch (err) {
        return (0, ResponseError_1.default)(500, res, err.message);
    }
});
exports.getInvoice = getInvoice;
