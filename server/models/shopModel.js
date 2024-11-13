
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
   
    password: {
        type: String,
        required: true
    },
    regNo: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
  
    contact: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
   
    isActive: {
        type: Boolean,
        default: true
    },
    image: {
        type: Object,
        required: true
    },
},{timeStamps:true});
module.exports = mongoose.model('shops', schema)