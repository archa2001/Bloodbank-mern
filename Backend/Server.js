
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/bloodbank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const userRoute = require('./Routes/userroutes');
const adminRoute =require('./Routes/adminroutes');
app.use("/user", userRoute);
app.use("/admin",adminRoute);

app.listen(port, () => console.log(`Server started on port ${port}`));