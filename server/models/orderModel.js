const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },

    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    custId: {
      type: mongoose.Types.ObjectId,
      ref: "customers",
      required: true,
    },
    agentId: {
      type: mongoose.Types.ObjectId,
      ref: "agents",
    },
    dropAgentId: {
      type: mongoose.Types.ObjectId,
      ref: "agents",
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
    },
    houseName: {
      type: String,
    },
    pickupDate: Date,
    paymentStatus: {
      type: Boolean,
      default: false,
    },
    serviceStatus: {
      type: String,
      default: "Pending",
    },
    agentStatus: {
      type: Boolean,
      default: false,
    },
    dropStatus: {
      type: Boolean,
      default: false,
    },
    orderDate: {
      type: Date,
    },
    completionDate: {
      type: Date,
    },
    deliveryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", schema);
