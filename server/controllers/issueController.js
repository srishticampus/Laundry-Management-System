const IssueModel = require('../models/issueModel'); 

// Register Issue
const registerIssue = async (req, res) => {
  try {
    const { agentId, orderId,type, comments,issueType } = req.body;

    const newIssue = new IssueModel({
      agentId,
      type,
      comments,
      orderId,
      issueType
    });

    await newIssue.save();
    return res.json({
      status: 200,
      msg: "Issue submitted successfully",
      data: newIssue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      msg: "Error submitting Issue",
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
};
