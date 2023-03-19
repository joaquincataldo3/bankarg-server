const errorHandler = (err, req, res, next) => {
    const errorStatus = res.statusCode || 500

    res.status(errorStatus)

    res.json({msg: err.message})

}

module.exports = errorHandler