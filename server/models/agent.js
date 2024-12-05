
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    password: {
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
        default: false
    },
    image: {
        type: Object,
        required: true
    },
    rc: {
        type: Object,
        required: true
    },
    insurance: {
        type: Object,
        required: true
    },
    adminApproved:{
        type: Boolean,
        default: false
    },
    license: {
        type: Object,
        required: true
    },
},{timeStamps:true});
module.exports = mongoose.model('agents', schema)