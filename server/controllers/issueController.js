const IssueModel = require('../models/issueModel'); 
const orderModel = require('../models/orderModel');
const mongoose=require('mongoose')
// Register Issue
const registerIssue = async (req, res) => {
  try {
    console.log(req.body.orderId);

    const { agentId, orderId, type, comments, issueType } = req.body;

    // Validate orderId
    if (!mongoose.isValidObjectId(orderId)) {
      return res.status(400).json({
        status: 400,
        msg: "Invalid orderId",
      });
    }

    // Find the order
    const shp = await orderModel.findById(orderId);
    console.log("sh",shp);
    if (!shp) {
      return res.status(404).json({
        status: 404,
        msg: "Order not found",
      });
      console.log(shp);
      
    }

    // Create the issue
    const newIssue = new IssueModel({
      agentId,
      type,
      comments,
      orderId,
      shopId: shp.shopId,
      custId: shp.custId,
      issueType,
    });

    await newIssue.save();

    // Update the order based on type
    if (type === "Pickup") {
      await orderModel.findByIdAndUpdate({_id:shp._id}, {
        agentId: null,
        agentStatus: false,
      });
    } else {
      await orderModel.findByIdAndUpdate({_id:shp._id}, {
        dropAgentId: null,
        dropStatus: false,
      });
    }

    return res.json({
      status: 200,
      msg: "Issue submitted successfully",
      data: newIssue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: "Error submitting issue",
      error: error.message,
    });
  }
};


// View All Issues
const viewIssues = async (req, res) => {
  try {
    const Issues = await IssueModel.find()
    .populate('agentId') .populate('orderId').sort({ createdAt: 1 }).exec();
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};

// View All Issues by shop Id
const viewIssuesByShopId = async (req, res) => {
  try {
    const Issues = await IssueModel.find({shopId:req.params.id,status:"Pending"})
    .populate('agentId') .populate('orderId').sort({ createdAt: 1 }).exec();
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};


//by shop Id
const updateIssuesByShopId = async (req, res) => {
  try {
    const Issues = await IssueModel.findByIdAndUpdate({_id:req.params.id},
      {status:"Enquired"})
   .exec();
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};

const updateIssuesByCustId = async (req, res) => {
  try {
    console.log(req.params.id);
    
    const Issues = await IssueModel.findByIdAndUpdate({_id:req.params.id},
      {status:"Viewed"})
   .exec();
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};
// View All Issues by cust Id
const viewIssuesByCustId = async (req, res) => {
  try {
    const Issues = await IssueModel.find({custId:req.params.id,status:"Enquired"})
    .populate('agentId').populate('shopId')
     .populate('orderId').sort({ createdAt: 1 }).exec();
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};
//del  Issues by cust Id
const delIssuesById = async (req, res) => {
  try {
    const Issues = await IssueModel.findByIdAndDelete(req.params.id)
    
    return res.json({
      status: 200,
      msg: "Issues obtained successfully",
      data: Issues,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Failed to retrieve Issues",
      error: error.message,
    });
  }
};

// View Issue by ID
const viewIssueById = async (req, res) => {
  try {
    const Issue = await IssueModel.findById(req.params.id).exec();
    if (Issue) {
      return res.json({
        status: 200,
        msg: "Issue obtained successfully",
        data: Issue,
      });
    } else {
      return res.json({
        status: 404,
        msg: "Issue not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      msg: "Error retrieving Issue",
      error: error.message,
    });
  }
};


module.exports = {
  registerIssue,
  viewIssues,
  viewIssueById,
  viewIssuesByShopId,
  updateIssuesByShopId,
  delIssuesById,
  viewIssuesByCustId,
  updateIssuesByCustId

};
