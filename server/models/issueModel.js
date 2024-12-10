const mongoose=require("mongoose")

const schema=mongoose.Schema({
    comments:{
        type:String,
        required:true,
    },
    agentId:{
        type:mongoose.Types.ObjectId,
        ref:'agents',
        required:true
    },
    orderId:{
        type:mongoose.Types.ObjectId,
        ref:'orders',
        required:true
    },
    type:{
        type:String,
        required:true
    },
    issueType:{
        type:String,
        required:true
    },

},{timestamps:true});
module.exports=mongoose.model('issues',schema)