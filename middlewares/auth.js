const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.cookies.user_access_token

    if (!token) {
        res.status(401)
        throw new Error('You are not authenticated')
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            res.status(403)
            throw new Error('Token invalid')
        }
        req.user = user
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.isAdmin) {
            next()
        } else {
            res.status(403)
            throw new Error('You are not authorized to perform this action')
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (!req.isAdmin) {
            res.status(403)
            throw new Error('You are not authorized to perform this action')
        }
        next()
    })
}



module.exports = { verifyToken, verifyUser, verifyAdmin }