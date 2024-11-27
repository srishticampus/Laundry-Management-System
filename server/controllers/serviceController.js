const Service = require('../models/ServiceModel');


const addService = async (req, res) => {
    try {
        const {      
            name,
            description,
            amount,
            shopId} = req.body;

        const newwData = new Service({
           
          name,
          description,
          amount,
          shopId
        });
        const existingServiceByName = await Service.findOne({ name });

        if (existingServiceByName) {
            return res.status(409).json({ msg: "The Service Name Already Added!" });
        }
       
        await newwData.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
};

const viewServiceById = (req, res) => {
    console.log(req.params.id);
    
    Service.findById({_id:req.params.id})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const viewServiceByName = (req, res) => {
    console.log(req.params.id);
    
    Service.findOne({name:req.params.id})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const editServiceById = (req, res) => {
    const {      
        name,
        description,
        amount,
        } = req.body;

    Service.findByIdAndUpdate({_id:req.params.id},{
        name,
        description,
        amount,
    })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

const viewAllServiceByShopId = (req, res) => {
    Service.find({shopId:req.params.id})
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};
const viewAllServices = (req, res) => {
    Service.find()
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


module.exports = {
    addService,
    viewAllServiceByShopId,
    viewAllServices,
    viewServiceById,
    editServiceById,
    viewServiceByName
}
