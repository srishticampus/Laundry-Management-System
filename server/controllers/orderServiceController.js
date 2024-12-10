const ServiceOrder = require('../models/orderServiceModel');

// Add a new service order
const addServiceOrder = async (req, res) => {
    try {
        const { serviceId, materials, shopId, custId, orderId } = req.body;
console.log("rows",req.body.materials);

        const newServiceOrder = new ServiceOrder({
            serviceId,
            materials,
            shopId,
            custId,
            orderId,
        });

        await newServiceOrder.save()
            .then((data) => {
                res.json({
                    status: 200,
                    msg: "Service Order added successfully",
                    data: data,
                });
            })
            .catch((err) => {
                console.error(err);
                res.json({
                    status: 500,
                    msg: "Failed to add Service Order",
                    error: err,
                });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// View a service order by ID
const viewServiceOrderById = async (req, res) => {
    try {
        const data = await ServiceOrder.findById(req.params.id).populate('serviceId  orderId');
        if (data) {
            res.json({
                status: 200,
                msg: "Service Order retrieved successfully",
                data: data,
            });
        } else {
            res.json({
                status: 404,
                msg: "No Service Order found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// View all service orders by shop ID
const viewServiceOrdersByShopId = async (req, res) => {
    try {
        const data = await ServiceOrder.find({ shopId: req.params.shopId }).populate('serviceId shopId custId orderId');
        res.json({
            status: 200,
            msg: "Service Orders retrieved successfully",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const viewServiceOrdersBycustId = async (req, res) => {
    try {
        const data = await ServiceOrder.find({ custId: req.params.id }).populate('serviceId orderId');
        res.json({
            status: 200,
            msg: "Service Orders retrieved successfully",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
const viewServiceOrdersByOrderId = async (req, res) => {
    try {
        const data = await ServiceOrder.find({ orderId: req.params.id }).populate('serviceId');
        res.json({
            status: 200,
            msg: "Service Orders retrieved successfully",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// Edit a service order by ID
const editServiceOrderById = async (req, res) => {
    try {
        const updatedData = await ServiceOrder.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        if (updatedData) {
            res.json({
                status: 200,
                msg: "Service Order updated successfully",
                data: updatedData,
            });
        } else {
            res.json({
                status: 404,
                msg: "Service Order not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a service order by ID
const deleteServiceOrderById = async (req, res) => {
    try {
        const deletedData = await ServiceOrder.findByIdAndDelete(req.params.id);
        if (deletedData) {
            res.json({
                status: 200,
                msg: "Service Order deleted successfully",
            });
        } else {
            res.json({
                status: 404,
                msg: "Service Order not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// View all service orders
const viewAllServiceOrders = async (req, res) => {
    try {
        const data = await ServiceOrder.find().populate('serviceId shopId custId orderId');
        res.json({
            status: 200,
            msg: "All Service Orders retrieved successfully",
            data: data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addServiceOrder,
    viewServiceOrderById,
    viewServiceOrdersByShopId,
    editServiceOrderById,
    deleteServiceOrderById,
    viewAllServiceOrders,
    viewServiceOrdersBycustId,
    viewServiceOrdersByOrderId
};
