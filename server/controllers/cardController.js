const Card = require('../models/cardModel');

// Add a new card
const addCard = async (req, res) => {
    try {
        const { name, expiry, cardno, custId,cvv } = req.body;
        const existingCust = await Card.findOne({ custId })
        if(existingCust){
            Card.findOneAndUpdate(
                { custId: req.body.custId },
                {
                    name,
                    expiry,
                    cardno,
                    cvv
                },
              
            ).exec()
            .then(data => {
                res.json({
                    status: 200,
                    msg: "Card updated successfully",
                    data: data,
                });
            })
            .catch(err => {
                res.status(500).json({
                    msg: "Failed to update card",
                    error: err,
                });
            });
        }
else{
        const newCard = new Card({
            name,
            expiry,
            cardno,
            custId,
            cvv
        });

        const existingCard = await Card.findOne({ cardno });
        if (existingCard) {
            return res.status(409).json({ msg: "The card number is already added!" });
        }

        await newCard.save()
        
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Card added successfully",
                    data: data,
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    msg: "Card not added",
                    error: err,
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error", error: error.message });
    }
};

// View a card by ID
const viewCardById = (req, res) => {
    Card.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Card retrieved successfully",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "Failed to retrieve card",
                error: err,
            });
        });
};

// View all cards by customer ID
const viewAllCardsByCustomerId = (req, res) => {
    Card.findOne({ custId: req.params.custId })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Cards retrieved successfully",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "Failed to retrieve cards",
                error: err,
            });
        });
};

// View all cards
const viewAllCards = (req, res) => {
    Card.find()
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Cards retrieved successfully",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "Failed to retrieve cards",
                error: err,
            });
        });
};

// Edit card by ID
const editCardById = (req, res) => {
    const { name, expiry, cardno } = req.body;

    Card.findByIdAndUpdate(
        { _id: req.params.id },
        {
            name,
            expiry,
            cardno,
        },
        { new: true } // Return the updated document
    )
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Card updated successfully",
                data: data,
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "Failed to update card",
                error: err,
            });
        });
};

// Delete card by ID
const deleteCardById = (req, res) => {
    Card.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(() => {
            res.json({
                status: 200,
                msg: "Card deleted successfully",
            });
        })
        .catch(err => {
            res.status(500).json({
                msg: "Failed to delete card",
                error: err,
            });
        });
};

module.exports = {
    addCard,
    viewCardById,
    viewAllCardsByCustomerId,
    
    editCardById,
    deleteCardById,
};
