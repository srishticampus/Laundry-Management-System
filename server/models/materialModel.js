const mongoose=require("mongoose")

const schema=mongoose.Schema({
    name:{
        type:String,
      
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    
    shopId:{
        type:mongoose.Types.ObjectId,
        ref:'shops',
        required:true
    }

},{timeStamps:true});
module.exports=mongoose.model('materials',schema)