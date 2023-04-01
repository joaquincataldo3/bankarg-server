require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const shoesRouter = require('./src/routers/shoes')
const adminRouter = require('./src/routers/admins')
const brandsRouter = require('./src/routers/brands')
const usArgSizesRouter = require('./src/routers/us_arg_sizes')
const errorMiddleware = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

const app = express();
const { MONGO_URI } = process.env


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorMiddleware)
app.use(cookieParser())

app.use('/shoes', shoesRouter)
app.use('/admins', adminRouter)
app.use('/brands', brandsRouter)
app.use('/us-arg-sizes', usArgSizesRouter)

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




