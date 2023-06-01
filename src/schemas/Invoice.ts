import mongoose ,  { Schema } from "mongoose";

const invoiceSchema = new Schema({

     user_id: {
      type:String,
      required:true,
      ref:'users'
     },

     billFrom: {
         address:String,
         city:String,
         zipCode:String,
         country: String
     },
     billTo: {
         address:String,
         city:String,
         zipCode:String,
         country: String,
         paymentDate: {
             type:String,
             required:true
         },
         paymentDue: {
             type:String,
             required:true
         },
         clientEmail: {
             type:String,
         },
         clientName: {
             type:String
         },
         amount: {
             type:Number
         },

         status: {
             type:String,
             enum:['Pending' , 'Draft' , 'Paid']
         },
         paymentTerms: {
             type:String
         },
         productDescription: {
             type:String
         },
     },

     items: {
        type:[
            {
                qty:Number,
                itemName:String,
                total:Number,
                price:Number
            }
        ],
        default:[]
     },
});


const invoiceModel =  mongoose.model('invoice' , invoiceSchema);

export const findAllInvoice = async (id : string) => await invoiceModel.find({ user_id:id });
export const findInvoiceById = async (id : String) => await invoiceModel.findById(id);
export const findInvoiceByUserId = async (userId : string) => await invoiceModel.findOne({ user_id:userId });

export default invoiceModel;