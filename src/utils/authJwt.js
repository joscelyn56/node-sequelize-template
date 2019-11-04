const jwt = require('jsonwebtoken')
const config = require('../config/config.js')

verifyToken = (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) {
        return res.status(200).send({
            error: true,
            msg: 'Please login to continue using the service.'
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(200).send({
                error: true,
                msg: 'Authentication Failed.'
            })
        }
        req.userId = decoded.id
        next()
    })
}

const authJwt = {}
authJwt.verifyToken = verifyToken

module.exports = authJwt