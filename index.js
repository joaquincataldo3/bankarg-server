require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')

const app = express();
const { MONGO_URI } = process.env

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

try {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Mongo DB Connected');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server opened on ${PORT}`);
        })
    })
} catch (error) {
    console.log(`Mongo DB connection error: ${error}`)
    process.exit(1)
}



