const mongoose = require('mongoose');

const donateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bloodGroup:{
        type: String,
        enum: ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'],
        required: true,  
    },
    quantity: {
        type: String,
        required: true,
    },
    diseases: {
        type: String,
    },
    dateofbirth: {
        type: Date,
        required: true,
    },
    weight: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true,
    },
    dateofdonation:{
        type:Date,
        required:true
    }
});

const Donate = mongoose.model('Donate', donateSchema);

module.exports = Donate;