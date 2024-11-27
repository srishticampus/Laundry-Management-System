const mongoose=require("mongoose")

const schema=mongoose.Schema({
    
    totalAmount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
   
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
    orderStatus:{
        type:String,
        default:'Pending'
    },
    city:{
        type:String
    },
    district:{
        type:String
    },
    street:{
        type:String
    },
    landmark:{
        type:String
    },
    pincode:{
        type:String
    },
    houseName:{
        type:String
    },
    pickupDate:Date,
    paymentStatus:{
        type:Boolean,
        default:false
    }

},{timeStamps:true});
module.exports=mongoose.model('orders',schema)