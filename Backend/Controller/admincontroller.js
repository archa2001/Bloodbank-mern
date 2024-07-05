const User = require('../Model/usermodel');
const Request = require('../Model/requestmodel');
const Donate = require('../Model/donatemodel');
const Admin =require('../Model/adminmodel');
const jwt=require('jsonwebtoken');
const BloodInventory = require('../Model/bloodinventorymodel');



const Adminlogin = async (req, res) => {
    try {
        const { adminemail, adminpas } = req.body;
        if (adminemail !== 'admin@123gmail.com' || adminpas !== 'admin123') {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ email: adminemail }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true, secure: false });
        res.setHeader("Authorization", token);
        res.json({ message: "Welcome Admin", token });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const getTotalBloodCount = async (req, res) => {
    try {
        const bloodInventories = await BloodInventory.find({});
        const bloodCount = {};

        bloodInventories.forEach(inventory => {
            bloodCount[inventory.bloodGroup] = inventory.count;
        });

        res.status(200).json(bloodCount);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Accept Blood Request
const acceptBloodRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        let bloodInventory = await BloodInventory.findOne({ bloodGroup: request.requiredbloodgroup });
        if (!bloodInventory || bloodInventory.count <= 0) {
            return res.status(400).json({ message: 'Insufficient blood inventory' });
        }

        request.status = 'Accepted';
        await request.save();

        bloodInventory.count -= 1;
        await bloodInventory.save();

        res.status(200).json({ message: 'Request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



const getAllBloodRequests = async (req, res) => {
    try {
        const requests = await Request.find({});
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Delete a blood request
const deleteBloodRequest = async (req, res) => {
    try {
        const { requestId } = req.params;

        const request = await Request.findByIdAndDelete(requestId);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    getAllBloodRequests,
    getTotalBloodCount,
    acceptBloodRequest,
    deleteBloodRequest,
    Adminlogin
};