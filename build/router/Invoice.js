"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Invoice_1 = require("../controller/Invoice");
const CheckIfAuthenticated_1 = __importDefault(require("../middleware/CheckIfAuthenticated"));
const router = express_1.default.Router();
router.get('/user/all', CheckIfAuthenticated_1.default, Invoice_1.getAllUserInvoice);
router.get('/:id', CheckIfAuthenticated_1.default, Invoice_1.getInvoice);
router.post('/create', CheckIfAuthenticated_1.default, Invoice_1.createInvoice);
router.delete(`/delete/:id`, CheckIfAuthenticated_1.default, Invoice_1.deleteInvoice);
router.patch(`/update/:id`, CheckIfAuthenticated_1.default, Invoice_1.updateInvoice);
router.patch(`/update/status/:id`, CheckIfAuthenticated_1.default, Invoice_1.updateInvoiceStatus);
exports.default = router;
