const mongoose = require('mongoose');

const bloodInventorySchema = new mongoose.Schema({
    bloodGroup: {
        type: String,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
        required: true,
       
    },
    count: {
        type: Number,
        default: 0,
    },
});

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);

module.exports = BloodInventory;