/*!
 * Authentication Middleware
 */

'use strict'

/**
 * Module dependencies
 * @private
 */
const authRepo = require('../repository/auth.repository')

/**
 * Module exports
 * @public
 */
module.exports.accountExists = accountExists
module.exports.isRegistered = isRegistered
module.exports.isActive = isActive

/**
 * @function
 * Check if user exists with similar details
 */
async function accountExists(req, res, next) {
    try {
        let user = req.body.email
        let response = await authRepo.accountExists(user)
        if (response) {
            return res.status(200).json({
                error: true,
                msg: 'Email is associated with another account.'
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Check if user account does not exist
 */
async function isRegistered(req, res, next) {
    try {
        let email = req.body.email || req.params.email
        let response = await authRepo.accountExists(email)
        if (!response) {
            return res.status(200).json({
                error: true,
                msg: 'Account does not exists.'
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Check if user account has been activated
 */
async function isActive(req, res, next) {
    try {
        let email = req.body.email
        let response = await authRepo.isActive(email)
        if (!response) {
            return res.status(200).json({
                error: true,
                msg: 'Account has not been activated.'
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}