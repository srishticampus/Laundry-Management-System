const mongoose=require("mongoose")

const schema=mongoose.Schema({
    
    serviceId:{
        type:mongoose.Types.ObjectId,
        ref:'services',
        required:true
    },
    materials:[],
   
    shopId:{
        type:mongoose.Types.ObjectId,
        ref:'shops',
        required:true
    },
    custId:{
        type:mongoose.Types.ObjectId,
        ref:'customers',
        required:true
    },
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'orders',
        required:true
    }

},{timeStamps:true});
module.exports=mongoose.model('serviceorders',schema)