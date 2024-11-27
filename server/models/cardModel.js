const mongoose=require("mongoose")

const schema=mongoose.Schema({
    name:{
        type:String,
      
        required:true,
    },
    expiry:{
        type:Date,
      
        required:true,
    },
    
    cardno:{
        type:Number,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    },
    
    custId:{
        type:mongoose.Types.ObjectId,
        ref:'customers',
        required:true
    }

},{timeStamps:true});
module.exports=mongoose.model('cards',schema)