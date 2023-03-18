require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')


const app = express();
const { MONGO_URI } = process.env


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI)
    } catch (error) {
        console.log(`Mongo DB connection error: ${error}`)
        process.exit(1)
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connect()
    console.log(`Server opened on ${PORT}`);
})




