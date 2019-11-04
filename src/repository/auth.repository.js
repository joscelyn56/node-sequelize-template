/*!
 * Authentication Repository
 */
'use strict'

/**
 * Module dependencies.
 * @private
 */
const {
    User
} = require('../services/user.service')
const Utils = require('../utils/utils')
const config = require('../config/config.js')

const uuidv4 = require('uuid/v4')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

function AuthRepository() {}

AuthRepository.prototype.signup = async(req, res) => {
    let email = req.body.email
    let password = req.body.password
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    try {
        let hashedPassword = bcrypt.hashSync(password, 8)
        let userId = await uuidv4()

        await User.add({
            userId: userId,
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword
        }).then(response => {
            return response ?
                res.status(200).json({
                    error: false,
                    msg: 'Signup successful.'
                }) :
                res.status(200).json({
                    error: true,
                    msg: 'Error signing up new user.'
                })
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.signin = async(req, res) => {
    let email = req.body.email
    let password = req.body.password
    try {
        await User.get({
            email: email
        }).then(user => {
            let response = Object.assign({}, user)
            if (Utils.isValid(response)) {
                let passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    return res.status(200).send({
                        error: true,
                        accessToken: null,
                        msg: 'Incorrect login details!'
                    })
                }

                user.last_login_date = Utils.getDate()
                user.save()

                let token = jwt.sign({
                        id: user.userId
                    },
                    config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    }
                )

                user.password = null

                return res.status(200).send({
                    error: false,
                    accessToken: token,
                    user: user
                })
            }
            return res.status(200).json({
                error: true,
                msg: 'Error signing in user.'
            })
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.forgotPassword = async(req, res) => {
    let email = req.body.email

    try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8)
        let response = await User.update({
            password: hashedPassword
        }, {
            email: email
        })
        return response ?
            res.status(200).json({
                error: false,
                msg: 'A mail containing your new password has been sent.'
            }) :
            res.status(200).json({
                error: true,
                msg: 'Error updating new password.'
            })
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.changePassword = async(req, res) => {
    let userId = req.userId
    let password = req.body.password
    let new_password = req.body.new_password

    try {
        await User.get({
            userId: userId
        }, ['id', 'password']).then(user => {
            let response = Object.assign({}, user)
            if (Utils.isValid(response)) {
                let passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    return res.status(200).send({
                        error: true,
                        msg: 'Incorrect old password'
                    })
                }
                let hashedPassword = bcrypt.hashSync(new_password, 8)

                user.password = hashedPassword
                user.save()

                return res.status(200).send({
                    error: false,
                    msg: 'Password updated successfully.'
                })
            }
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.delete = async(req, res) => {
    let id = req.params.user
    try {
        let response = await User.delete({
            userId: id
        })
        if (response) {
            return res.status(200).json({
                error: false,
                msg: 'User deleted successfully.'
            })
        }
        return res.status(200).json({
            error: true,
            msg: 'Error deleting user.'
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.accountExists = async email => {
    try {
        let response = {}
        await User.get({
            email: email
        }).then(user => {
            response = Object.assign({}, user)
        })
        return !!Utils.isValid(response)
    } catch (err) {
        console.error(err)
        throw err
    }
}

AuthRepository.prototype.isActive = async email => {
    try {
        let active = false
        await User.get({
            email: email
        }).then(user => {
            active = user.active
        })
        return active
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = new AuthRepository()