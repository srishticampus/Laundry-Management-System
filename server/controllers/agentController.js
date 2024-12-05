const Agent = require('../models/agent');
const multer = require("multer");
const customerModel = require('../models/customerModel');
const shopModel = require('../models/shopModel');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'Agent-';
        const extension = file.originalname.split('.').pop();
        const filename = uniquePrefix + file.originalname.replace(`.${extension}`, '') + '-' + Date.now() + `.${extension}`;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage }).fields([
    { name: 'image', maxCount: 1 },  
    { name: 'insurance', maxCount: 1 } ,
    { name: 'rc', maxCount: 1 } ,
    { name: 'license', maxCount: 1 } 
  ]);

// Register new Agent
const registerAgent = async (req, res) => {
    try {
        const { name, contact, email, password,city,pincode,location

        } = req.body;
        const image = req.files.image[0]
        const insurance = req.files.insurance[0]
        const license = req.files.license[0]

        const rc = req.files.rc[0]

        console.log("Registering Agent");

        const newAgent = new Agent({
           
            name,
            city,
            pincode,
            location,
        
            contact,
            email,
           
            password,
            image: image,
            license: license,
            rc:rc,
            insurance:insurance

        });

        // Check for duplicate entries
        const existingAgentByContact = await Agent.findOne({ contact });
   
        const existingAgentByEmail = await Agent.findOne({ email });
        const existingCustByEmail = await customerModel.findOne({ email });
        const existingShopByEmail = await shopModel.findOne({ email });

        if (existingAgentByContact) {
            return res.status(409).json({ msg: "Contact Number Already Registered!" });
        }
      
        if (existingAgentByEmail ||existingCustByEmail ||existingShopByEmail) {
            return res.status(409).json({ msg: "Email Already Registered!" });
        }


        await newAgent.save();
        res.status(200).json({ msg: "Agent Registered Successfully", data: newAgent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error Registering Agent", error });
    }
};

// View all Agents
const viewAgents = async (req, res) => {
    try {
        const Agents = await Agent.find({}).exec();
        res.status(200).json({ msg: "Agents retrieved successfully", data: Agents });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Agents", error });
    }
};
// View all Agents
const viewApprovedAgents = async (req, res) => {
    try {
        const Agents = await Agent.find({adminApproved:true}).exec();
        res.status(200).json({ msg: "Agents retrieved successfully", data: Agents });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Agents", error });
    }
};
const login = (req, res) => {
    const { email, password } = req.body;

    Agent.findOne({ email }).then(user => {

console.log(user);

        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
        }
        if (!user.adminApproved) {
            return res.json({ status: 405, msg: 'Please wait for Admin Approval !!' });
        }
        if (!user.isActive) {
            return res.json({ status: 405, msg: 'You are currently deactivated By Admin !!' });
        }
       

        res.json({
            status: 200,
            data: user,
            
        });

    }).catch(err => {
        console.log(err);
        return res.json({ status: 500, msg: 'Something went wrong' });

    })
};

// View Agent by ID
const viewAgentsforApproval = async (req, res) => {
    try {
        const AgentData = await Agent.find({adminApproved:false}).exec();
        
        res.status(200).json({ msg: "Agent retrieved successfully", data: AgentData });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Agent", error });
    }
};
// View Agent by ID
const viewAgentById = async (req, res) => {
    try {
        const AgentData = await Agent.findById(req.params.id).exec();
        if (!AgentData) {
            return res.status(404).json({ msg: "Agent not found" });
        }
        res.status(200).json({ msg: "Agent retrieved successfully", data: AgentData });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Agent", error });
    }
};

// Edit Agent by ID
const editAgentById = async (req, res) => {
    const {  name, contact, email } = req.body;

    try {
        // Find and update Agent
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, {
          
            name,
            city,
            pincode,
            location,
        
            contact,
            email,
           
            password,
            image: image,
            license: license,
            rc:rc,
            insurance:insurance
        }, { new: true }).exec();

        if (!updatedAgent) {
            return res.status(404).json({ msg: "Agent not found" });
        }

        res.status(200).json({ msg: "Agent updated successfully", data: updatedAgent });
    } catch (error) {
        res.status(500).json({ msg: "Error updating Agent", error });
    }
};

// Delete Agent by ID
const deleteAgentById = async (req, res) => {
    try {
        const deletedAgent = await Agent.findByIdAndDelete(req.params.id).exec();
        if (!deletedAgent) {
            return res.status(404).json({ msg: "Agent not found" });
        }
        res.status(200).json({ msg: "Agent deleted successfully", data: deletedAgent });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting Agent", error });
    }
};
// Delete Agent by ID
const approveAgentById = async (req, res) => {
    try {
        const deletedAgent = await Agent.findByIdAndUpdate(req.params.id,{adminApproved:true,
            isActive:true
        }).exec();
       
        res.status(200).json({ msg: "Agent Approved successfully", data: deletedAgent });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting Agent", error });
    }
};
// Activate/Deactivate Agent by ID
const toggleAgentActivation = async (req, res) => {
    try {
        console.log("in");
        
        const AgentData = await Agent.findById(req.params.id).exec();
        if (!AgentData) {
            return res.status(404).json({ msg: "Agent not found" });
        }

        // Toggle activation
        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, {
            isActive: !AgentData.isActive
        }, { new: true }).exec();

        res.status(200).json({ msg: `Agent ${updatedAgent.isActive ? 'activated' : 'deactivated'} successfully`, data: updatedAgent });
    } catch (error) {
        res.status(500).json({ msg: "Error toggling Agent activation", error });
    }
};



module.exports = {
    registerAgent,
    viewAgents,
    viewAgentById,
    editAgentById,
    deleteAgentById,
    toggleAgentActivation,
    login,
    upload,
    approveAgentById,
    viewAgentsforApproval,
    viewApprovedAgents
};
