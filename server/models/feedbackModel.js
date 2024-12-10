const mongoose=require("mongoose")

const schema=mongoose.Schema({
    comments:{
        type:String,
        required:true,
    },
    custId:{
        type:mongoose.Types.ObjectId,
        ref:'customers',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },

},{timestamps:true});
module.exports=mongoose.model('feedback',schema)