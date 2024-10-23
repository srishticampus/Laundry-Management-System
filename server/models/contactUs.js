const mongoose=require("mongoose")

const schema=mongoose.Schema({
    email:{
        type:String,
      
        required:true,
    },
    msg:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },

},{timeStamps:true});
module.exports=mongoose.model('conatcts',schema)