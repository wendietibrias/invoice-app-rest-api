import express , { Router } from "express";
import { getAllUserInvoice,createInvoice,deleteInvoice,updateInvoice,getInvoice,updateInvoiceStatus } from "../controller/Invoice";
import CheckIfAuthenticated from "../middleware/CheckIfAuthenticated";

const router : Router = express.Router();

router.get('/user/all' , CheckIfAuthenticated, getAllUserInvoice);
router.get('/:id' , CheckIfAuthenticated,  getInvoice);
router.post('/create' , CheckIfAuthenticated, createInvoice);
router.delete(`/delete/:id` , CheckIfAuthenticated, deleteInvoice);
router.patch(`/update/:id` , CheckIfAuthenticated, updateInvoice);
router.patch(`/update/status/:id` , CheckIfAuthenticated , updateInvoiceStatus);

export default router;