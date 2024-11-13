const mongoose = require("mongoose");

const workingHoursSchema = mongoose.Schema({
    shopId: {
        type: mongoose.Types.ObjectId,
        ref: 'shops', 
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: {
        type: String,
        required: function () {
            return this.isHoliday === false;
        } 
    },
    endTime: {
        type: String,
        required: function () {
            return this.isHoliday === false;
        }
    },
    isHoliday: {
        type: Boolean,
        default: false
    }
});

workingHoursSchema.statics.defaultWorkingHours = function (shopId) {
    return [
        { shopId, day: 'Monday', startTime: '08:00', endTime: '18:00', isHoliday: false },
        { shopId, day: 'Tuesday', startTime: '08:00', endTime: '18:00', isHoliday: false },
        { shopId, day: 'Wednesday', startTime: '08:00', endTime: '18:00', isHoliday: false },
        { shopId, day: 'Thursday', startTime: '08:00', endTime: '18:00', isHoliday: false },
        { shopId, day: 'Friday', startTime: '08:00', endTime: '18:00', isHoliday: false },
        { shopId, day: 'Saturday', isHoliday: true },
        { shopId, day: 'Sunday', isHoliday: true }
    ];
};

module.exports = mongoose.model('WorkingHours', workingHoursSchema);
