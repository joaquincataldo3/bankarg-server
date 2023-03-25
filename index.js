require("dotenv").config()
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./src/routers/user')
const accountRouter = require('./src/routers/account')
const adminRouter = require('./src/routers/admin')
const transactionRouter = require('./src/routers/transaction')
const errorMiddleware = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')

const app = express();
const { MONGO_URI } = process.env


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorMiddleware)
app.use(cookieParser())

app.use('/users', userRouter)
app.use('/accounts', accountRouter)
app.use('/admins', adminRouter)
app.use('/transactions', transactionRouter)

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




