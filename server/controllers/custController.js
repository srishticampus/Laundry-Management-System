const Customer = require('../models/customerModel');
const multer = require("multer");
const nodemailer = require('nodemailer');
const Configue = require("./Configue");
// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'Customer-';
        const extension = file.originalname.split('.').pop();
        const filename = uniquePrefix + file.originalname.replace(`.${extension}`, '') + '-' + Date.now() + `.${extension}`;
        cb(null, filename);
    },
});
const uploadSingle = multer({ storage: storage }).single('image');
// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supprot.web.application@gmail.com',
      pass: 'ukyw olqq kuql jnty'
    }
  });
const testMail = (data) => {
    let email=data.email
    const mailOptions = {
      from: 'supprot.web.application@gmail.com',
      to: email,
      subject: 'Reset Password From LaundryLynx',
      text: `Dear ${data.name},${'\n'}please check this link : ${Configue.serverUrl}${data._id} to reset your password`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }


// Register new Customer
const registerCustomer = async (req, res) => {
    try {
        const { regNo, name, contact, email, password} = req.body;
        console.log("Registering Customer");

        const newCustomer = new Customer({
           
            name,
           
        
            contact,
            email,
           
            password,
            image: req.file,

        });

        // Check for duplicate entries
        const existingCustomerByContact = await Customer.findOne({ contact });
   
        const existingCustomerByEmail = await Customer.findOne({ email });

        if (existingCustomerByContact) {
            return res.status(409).json({ msg: "Contact Number Already Registered!" });
        }
      
        if (existingCustomerByEmail) {
            return res.status(409).json({ msg: "Email Already Registered!" });
        }


        await newCustomer.save();
        res.status(200).json({ msg: "Customer Registered Successfully", data: newCustomer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error Registering Customer", error });
    }
};

// View all Customers
const viewCustomers = async (req, res) => {
    try {
        const Customers = await Customer.find({}).exec();
        res.status(200).json({ msg: "Customers retrieved successfully", data: Customers });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Customers", error });
    }
};

const login = (req, res) => {
    const { email, password } = req.body;

    Customer.findOne({ email }).then(user => {


        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
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


// View Customer by ID
const viewCustomerById = async (req, res) => {
    try {
        const CustomerData = await Customer.findById(req.params.id).exec();
        if (!CustomerData) {
            return res.status(404).json({ msg: "Customer not found" });
        }
        res.status(200).json({ msg: "Customer retrieved successfully", data: CustomerData });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving Customer", error });
    }
};

// Edit Customer by ID
const editCustomerById = async (req, res) => {
    const {  name, contact, email } = req.body;

    try {
        // Find and update Customer
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
          
            name,
           
            contact,
           
            email,
            image: req.file
        }, { new: true }).exec();

        if (!updatedCustomer) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        res.status(200).json({ msg: "Customer updated successfully", data: updatedCustomer });
    } catch (error) {
        res.status(500).json({ msg: "Error updating Customer", error });
    }
};

// Delete Customer by ID
const deleteCustomerById = async (req, res) => {
    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id).exec();
        if (!deletedCustomer) {
            return res.status(404).json({ msg: "Customer not found" });
        }
        res.status(200).json({ msg: "Customer deleted successfully", data: deletedCustomer });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting Customer", error });
    }
};

// Activate/Deactivate Customer by ID
const toggleCustomerActivation = async (req, res) => {
    try {
        console.log("in");
        
        const CustomerData = await Customer.findById(req.params.id).exec();
        if (!CustomerData) {
            return res.status(404).json({ msg: "Customer not found" });
        }

        // Toggle activation
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, {
            isActive: !CustomerData.isActive
        }, { new: true }).exec();

        res.status(200).json({ msg: `Customer ${updatedCustomer.isActive ? 'activated' : 'deactivated'} successfully`, data: updatedCustomer });
    } catch (error) {
        res.status(500).json({ msg: "Error toggling Customer activation", error });
    }
};

const forgotPWDsentMail=async(req,res)=>{
    let data=null
    try{
        
         data = await Customer.findOne({ email:  req.body.email })
    
       
        
          if (data != null)
            {
              
              testMail(data)
            res.json({
              status: 200,
              msg: "Data Obtained successfully",
            });
          }
          else
            res.json({
              status: 500,
              msg: "Enter your Registered MailId",
            });
        }
        catch(err) {
          console.log(err);
          res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err,
          })
        }
    
      }
      const custresetpswd=((req,res)=>{
        Customer.findByIdAndUpdate({_id:req.params.id},{ password: req.body.password }
          )
          .exec()
          .then((data) => {
            if (data != null)
              res.json({
                status: 200,
                msg: "Updated successfully",
              });
            else
              res.json({
                status: 500,
                msg: "User Not Found",
              });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: 500,
              msg: "Data not Updated",
              Error: err,
            });
          });
      
    })
module.exports = {
    registerCustomer,
    viewCustomers,
    viewCustomerById,
    editCustomerById,
    deleteCustomerById,
    toggleCustomerActivation,
    login,
    uploadSingle,
    forgotPWDsentMail,
    custresetpswd
};
