const workingHours=require('../models/workingHoursModel')

const setDefaultWorkingHoursForShop=async(shopId)=> {
    const existingHours = await workingHours.findOne({ shopId });
    if (!existingHours) {
        await workingHours.insertMany(workingHours.defaultWorkingHours(shopId));
    }
}

// Edit working hours for a specific day by ID
const editWorkingHoursById = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, isHoliday } = req.body;

        const updatedHours = await workingHours.findByIdAndUpdate(
            id,
            { startTime, endTime, isHoliday },
            { new: true, runValidators: true }
        );

        if (!updatedHours) {
            return res.status(404).json({ status: 404, msg: 'Working hours not found' });
        }

        res.json({ status: 200, msg: 'Working hours updated successfully', data: updatedHours });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error updating working hours', error: error.message });
    }
};

// View all working hours for a specific shop by shopId
const viewWorkingHoursByShopId = async (req, res) => {
    try {
        const  shopId  = req.params.id;
console.log(shopId);

        const workingHourss = await workingHours.find({ shopId });

     

        res.json({ status: 200, msg: 'Working hours retrieved successfully', data: workingHourss });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ status: 500, msg: 'Error retrieving working hours', error: error.message });
    }
};

// View working hours by ID
const viewWorkingHoursById = async (req, res) => {
    try {
        const { id } = req.params;

        const workingHoursss = await workingHours.findById(id);

        if (!workingHoursss) {
            return res.status(404).json({ status: 404, msg: 'Working hours not found' });
        }

        res.json({ status: 200, msg: 'Working hours retrieved successfully', data: workingHoursss });
    } catch (error) {
        res.status(500).json({ status: 500, msg: 'Error retrieving working hours', error: error.message });
    }
};

// Initialize default working hours for a new shop
// const initializeWorkingHoursForShop = async (req, res) => {
//     try {
//         const { shopId } = req.body;

//         const existingHours = await WorkingHours.findOne({ shopId });
//         if (existingHours) {
//             return res.status(400).json({ status: 400, msg: 'Working hours already initialized for this shop' });
//         }

//         const defaultHours = WorkingHours.defaultWorkingHours(shopId);
//         const createdHours = await WorkingHours.insertMany(defaultHours);

//         res.json({ status: 200, msg: 'Default working hours initialized successfully', data: createdHours });
//     } catch (error) {
//         res.status(500).json({ status: 500, msg: 'Error initializing working hours', error: error.message });
//     }
// };



module.exports={
    setDefaultWorkingHoursForShop,
    editWorkingHoursById,
    viewWorkingHoursByShopId,
    viewWorkingHoursById,
    // initializeWorkingHoursForShop
}