const shop = require('../models/shopModel');
const multer = require("multer");
const workingHours=require('./workingHoursController')

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'shop-';
        const extension = file.originalname.split('.').pop();
        const filename = uniquePrefix + file.originalname.replace(`.${extension}`, '') + '-' + Date.now() + `.${extension}`;
        cb(null, filename);
    },
});
const uploadSingle = multer({ storage: storage }).single('image');

// Register new shop
const registerShop = async (req, res) => {
    try {
        const { regNo, name, district, pincode, contact, email, password, location, owner } = req.body;
        console.log("Registering Shop");

        const newShop = new shop({
            regNo,
            name,
            district,
            pincode,
            contact,
            email,
            location,
            owner,
            password,
            image: req.file,

        });

        // Check for duplicate entries
        const existingShopByContact = await shop.findOne({ contact });
        const existingShopByRegNo = await shop.findOne({ regNo });
        const existingShopByEmail = await shop.findOne({ email });

        if (existingShopByContact) {
            return res.status(409).json({ msg: "Contact Number Already Registered!" });
        }
        if (existingShopByRegNo) {
            return res.status(409).json({ msg: "Register Number Already Registered!" });
        }
        if (existingShopByEmail) {
            return res.status(409).json({ msg: "Email Already Registered!" });
        }


        await newShop.save();
        workingHours.setDefaultWorkingHoursForShop(newShop._id)
        res.status(200).json({ msg: "Shop Registered Successfully", data: newShop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error Registering Shop", error });
    }
};

// View all shops
const viewShops = async (req, res) => {
    try {
        const shops = await shop.find({}).exec();
        res.status(200).json({ msg: "Shops retrieved successfully", data: shops });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving shops", error });
    }
};
const viewActiveShops = async (req, res) => {
    try {
        const shops = await shop.find({isActive:true}).exec();
        res.status(200).json({ msg: "Shops retrieved successfully", data: shops });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving shops", error });
    }
};
const login = (req, res) => {
    const { email, password } = req.body;

    shop.findOne({ email }).then(user => {


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


// View shop by ID
const viewShopById = async (req, res) => {
    try {
        const shopData = await shop.findById(req.params.id).exec();
        if (!shopData) {
            return res.status(404).json({ msg: "Shop not found" });
        }
        res.status(200).json({ msg: "Shop retrieved successfully", data: shopData });
    } catch (error) {
        res.status(500).json({ msg: "Error retrieving shop", error });
    }
};

// Edit shop by ID
const editShopById = async (req, res) => {
    const { regNo, name, district, pincode, contact, email,location,owner } = req.body;

    try {
        // Find and update shop
        const updatedShop = await shop.findByIdAndUpdate(req.params.id, {
            regNo,
            name,
            district,
            pincode,
            contact,
            location,
            owner,
            email,
            image: req.file
        }, { new: true }).exec();

        if (!updatedShop) {
            return res.status(404).json({ msg: "Shop not found" });
        }

        res.status(200).json({ msg: "Shop updated successfully", data: updatedShop });
    } catch (error) {
        res.status(500).json({ msg: "Error updating shop", error });
    }
};

// Delete shop by ID
const deleteShopById = async (req, res) => {
    try {
        const deletedShop = await shop.findByIdAndDelete(req.params.id).exec();
        if (!deletedShop) {
            return res.status(404).json({ msg: "Shop not found" });
        }
        res.status(200).json({ msg: "Shop deleted successfully", data: deletedShop });
    } catch (error) {
        res.status(500).json({ msg: "Error deleting shop", error });
    }
};

// Activate/Deactivate shop by ID
const toggleShopActivation = async (req, res) => {
    try {
        console.log("in");
        
        const shopData = await shop.findById(req.params.id).exec();
        if (!shopData) {
            return res.status(404).json({ msg: "Shop not found" });
        }

        // Toggle activation
        const updatedShop = await shop.findByIdAndUpdate(req.params.id, {
            isActive: !shopData.isActive
        }, { new: true }).exec();

        res.status(200).json({ msg: `Shop ${updatedShop.isActive ? 'activated' : 'deactivated'} successfully`, data: updatedShop });
    } catch (error) {
        res.status(500).json({ msg: "Error toggling shop activation", error });
    }
};



module.exports = {
    registerShop,
    viewShops,
    viewShopById,
    editShopById,
    deleteShopById,
    toggleShopActivation,
    viewActiveShops,
    login,
    uploadSingle
};
