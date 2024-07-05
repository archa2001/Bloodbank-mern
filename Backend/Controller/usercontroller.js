
const User = require('../Model/usermodel');
const Donate =require('../Model/donatemodel');
const Request =require('../Model/requestmodel');
const BloodInventory = require('../Model/bloodinventorymodel');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bodyParser = require('body-parser');


const registerUser = async (req, res) => {
    try {
        console.log('Request Body:', req.body); 
        const { name, email, password, confirm,bloodGroup } = req.body;
        console.log('Name:', name, 'Email:', email, 'Password:', password, 'Confirm Password:', confirm); 


        // if (!name || !email || !password || !confirm||!bloodGroup) {
        //     return res.status(400).json({ message: 'Please fill in all fields' });
        // }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        if (password !== confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        
        
    const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password:hashedPassword,bloodGroup,confirm});
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error in user registration', error: error.message });
    }
};



const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60,
            });
            res.setHeader('Authorization', token);
            res.status(200).json({ message: 'Welcome user', token });
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Login failed');
    }
    
};


const userdon = async (req, res) => {
    try {
        const { name,email, bloodGroup, quantity, diseases, dateofbirth, weight, height, dateofdonation } = req.body;

        if (!name ||!email || !bloodGroup || !quantity || !dateofbirth || !weight || !height || !dateofdonation) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const dob = new Date(dateofbirth);
        const ageDifMs = Date.now() - dob.getTime();
        const ageDate = new Date(ageDifMs); 
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (age < 18) {
            return res.status(400).json({ message: 'You must be at least 18 years old to donate blood' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (weight < 50 || height < 145) {
            return res.status(400).json({ message: "You must have weight and height at least 50 kg and 145 cm" });
        }

        const lastDonation = await Donate.findOne({ user: user._id }).sort({ dateofdonation: -1 });

        if (lastDonation) {
            const lastDonationDate = new Date(lastDonation.dateofdonation);
            const sixMonthsAgo = new Date(new Date(dateofdonation).setMonth(new Date(dateofdonation).getMonth() - 6));

            if (lastDonationDate > sixMonthsAgo) {
                return res.status(400).json({ message: 'You can only donate blood after 6 months from your last donation' });
            }
        }


        if (user.bloodGroup !== bloodGroup) {
            user.bloodGroup = bloodGroup;
            await user.save();
        }

        const donation = new Donate({
            user: user._id,
        email,
            quantity,
            bloodGroup,
            diseases,
            dateofbirth,
            weight,
            height,
            name,
            dateofdonation
        });

        await donation.save();

        let bloodInventory = await BloodInventory.findOne({ bloodGroup });
        if (!bloodInventory) {
            bloodInventory = new BloodInventory({ bloodGroup, count: 0 });
        }
        bloodInventory.count += 1;
        await bloodInventory.save();

        res.json({ message: 'BLOOD IS DONATED SUCCESSFULLY!!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error in Donating' });
    }
};

const userRequest = async (req, res) => {
    try {
        const { email, requiredbloodgroup, Age, reason } = req.body;

        if (!email || !requiredbloodgroup || !Age || !reason) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // if (user.bloodGroup === requiredbloodgroup) {
        //     return res.status(400).json({ message: 'You cannot request blood for the same blood group as yours' });
        // }

        const newRequest = new Request({
            name: user.name,
            bloodGroup: user.bloodGroup,
            requiredbloodgroup,
            Age,
            reason
        });

        await newRequest.save();

        res.status(201).json({ message: 'Blood request submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error in submitting request' });
    }
};



module.exports = {
    registerUser,
    userLogin,
    userdon,
    userRequest
    // userreq,
};