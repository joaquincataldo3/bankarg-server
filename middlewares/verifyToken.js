const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.cookies.admin_access_token

    if(!token) {
        res.status(401)
        throw new Error('You are not authenticated')
    }

    jwt.verify(token, process.env.JWT, (err, admin) => {
        if(err){
            res.status(403)
            throw new Error('Token invalid')
        }
        req.admin = admin
        next()
    })
}



module.exports = verifyToken