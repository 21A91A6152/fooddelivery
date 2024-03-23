import mongoose from "mongoose";
const Schema = mongoose.Schema
let AddadminP =new Schema({
    company:{
        type:String ,
        required:true
    },
    type:{
        type:String ,
        required:true
    },
    productname:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    category:{
        type:String  ,
        required: true   
    },
    price:{
        type:String  ,
        required: true   
    },
    image:{
        type:String  ,
        required: true   
    }

});
export default mongoose.model("Products",AddadminP)