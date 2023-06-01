import invoiceSchema from "../schemas/Invoice";
import { Response,Request } from "express";
import { IRequest } from "../interfaces/ExpressInterface";
import { findInvoiceById,findAllInvoice, findInvoiceByUserId } from "../schemas/Invoice";
import ResponseError from "../utils/ResponseError";
import ResponseSuccess from "../utils/ResponseSuccess";

const getAllUserInvoice = async (req : IRequest ,res : Response) => {
   const userId = req.userId;

   //cek jika user sudah login
   if(!userId) {
      return ResponseError(401, res, "Unauthorized");
   }

     try {
      const selectAllInvoice = await findAllInvoice(userId);

      if(selectAllInvoice) {
        return res.status(200).json({
             request_time:new Date().toDateString(),
             data:selectAllInvoice, 
             status:200
        });
      }

      return ResponseError(400 , res, "Invoice tidak ada");

     } catch(err : any) {
        return ResponseError(500 , res, err.message);
     }
}

const deleteInvoice = async (req : IRequest , res : Response) => {
    const userId = req.userId;
    
    if(!userId) {
        return ResponseError(401 , res, "Unauthorized");
    }

    try {
     const id : string = req.params.id.trim();

     const findInvoice = await findInvoiceById(id);

     if(findInvoice) {
        const deleteInvoice = await invoiceSchema.deleteOne({ _id:req.params.id.trim() });

        if(deleteInvoice) {
            return ResponseSuccess(200,res, "success remove invoice");
        }

        return ResponseError(400 ,res, "fail while remove invoice");

     }

    } catch(err : any) {
        return ResponseError(500 , res, err.message);
    }
}

const updateInvoice = async (req : IRequest , res : Response) => {
    const {
        billTo,
        billFrom,
        items
    } = req.body;

    try {
        const id = req.params.id.trim();

        const findInvoice = await findInvoiceById(id);

        if(findInvoice) {
            findInvoice.billTo = billTo;
            findInvoice.billFrom = billFrom;
            findInvoice.items = items;

            const saveInvoice = await findInvoice.save();

            if(saveInvoice) {
                return ResponseSuccess(200 , res, "Success update the invoice");
            }

            return ResponseError(400 , res , "fail while update invoice");
        }

    } catch(err : any) {
        return ResponseError(500 , res,err.message);
    }
}

const updateInvoiceStatus = async (req : IRequest , res : Response) => {
    const userId = req.userId;

    if(!userId) {
        return ResponseError(401 , res, "Unauthorized");
    }

    try {
        const { id } = req.params;
        const {
            status
        } = req.query;

        const findInvoice = await findInvoiceById(id);

        if(findInvoice) {
             const updateInvoice = await invoiceSchema.findOne({ _id : id }).updateOne({
                 billTo: {
                     ...findInvoice.billTo,
                     status:status
                 }
             });

             if(updateInvoice) {
                 return ResponseSuccess(200,res, "Success update invoice status");
             }
        }

    } catch(err : any) {
        return ResponseError(500, res, err.message);
    }
}

const createInvoice = async (req : IRequest , res : Response) => {
    const userId = req.userId;

    if(!userId) {
        return ResponseError(401, res ,"Unauthorized");
    }

    const {
        billFrom,
        billTo,
        items
    } = req.body;

    try {
        const initInvoice = new invoiceSchema({
            user_id: userId,
            billTo,
            billFrom,
            items
        });

        const saveInvoice = await initInvoice.save();

        if(saveInvoice) {
            return ResponseSuccess(200 , res, "Success creating invoice");
        } else {
            return ResponseError(400, res , "Fail while create invoice");
        }

    } catch(err : any) {
        return ResponseError(500 ,res, err.message);
    }
}

const getInvoice = async (req : IRequest , res : Response) => {
    const userId = req.userId;

    if(!userId) {
        return ResponseError(401,res, "Unauthorized")
    }

    try {
        const id = req.params.id;
        const findInvoice = await findInvoiceById(id);

        if(!findInvoiceById) {
            return ResponseError(404, res, "Invoice is not found");
        }

        return res.status(200).json({
            message:"Success get invoice",
            status:200,
            data:findInvoice
        });

    } catch(err : any) {
        return ResponseError(500 , res, err.message);
    }
}


export {
    getAllUserInvoice,
    deleteInvoice,
    createInvoice,
    updateInvoice,
    getInvoice,
    updateInvoiceStatus
}