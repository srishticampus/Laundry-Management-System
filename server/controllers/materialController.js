const Material = require('../models/materialModel');



const addMaterial = async (req, res) => {
    try {
        const {      
            name,
            description,
            amount,
            shopId} = req.body;

        const newwData = new Material({
           
          name,
          description,
          amount,
          shopId
        });
        const existingServiceByName = await Material.findOne({ name,shopId });

        if (existingServiceByName) {
            return res.status(409).json({ msg: "The Material Name Already Added!" });
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

const viewMaterialById = (req, res) => {
    console.log(req.params.id);
    
    Material.findById({_id:req.params.id})
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
const viewMaterialByName = (req, res) => {
    console.log(req.params.id);
    
    Material.findOne({name:req.params.id})
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
const editMaterialById = (req, res) => {
    const {      
        name,
        description,
        amount,
        } = req.body;

    Material.findByIdAndUpdate({_id:req.params.id},{
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

const viewAllMaterialByShopId = (req, res) => {
    Material.find({shopId:req.params.id})
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
const viewAllMaterials = (req, res) => {
    Material.find()
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
    addMaterial,
    viewAllMaterialByShopId,
    viewAllMaterials,
    viewMaterialById,
    viewMaterialByName,
    editMaterialById
}
