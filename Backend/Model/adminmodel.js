const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminemail:{
        type:'String',
        required:'true',
    },
    adminpas:{
        type:'String',
        required:'true',
    }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;