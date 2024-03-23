import mongoose from "mongoose";

const Schema = mongoose.Schema
let orderSchema =new Schema({
    
     
    company:{
        type:String ,
        required:true
    },
    user:{
        type:String ,
        required:true
    },
    productName:{
        type:String ,
        required:true
    },
    quantity:{
        type:String ,
        required:true
    },
    
    price:{
        type:Number  ,
        required: true   
    },
    status:{
        type:Number ,
        required: true   
    },
    
     
});

export default mongoose.model("Order",orderSchema)
 
 