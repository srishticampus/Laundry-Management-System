const contact = require('../models/contactUs');



const addContat = async (req, res) => {
    try {
        const { email,name,msg } = req.body;

        const newwData = new contact({
           
            email,
            name,
            msg
        });

       
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


const viewAllContacts = (req, res) => {
    contact.find()
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
    addContat,
    
    viewAllContacts
}
