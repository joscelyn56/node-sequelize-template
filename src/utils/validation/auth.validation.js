/*!
 * Authentication Validation
 */

'use strict'

/**
 * Module exports
 * @public
 */
module.exports.validateSignup = validateSignup
module.exports.validateGoogleSignup = validateGoogleSignup
module.exports.validateSignin = validateSignin
module.exports.validateGoogleSignin = validateGoogleSignin
module.exports.validateForgotPassword = validateForgotPassword
module.exports.validateUpdatePassword = validateUpdatePassword
module.exports.confirmNewPassword = confirmNewPassword

/**
 * @function
 * Validate signup request
 */
async function validateSignup(req, res, next) {
    try {
        let errors = {}


        if (!req.body.hasOwnProperty('first_name') || req.body.first_name === '') {
            errors['first_name'] = 'Please enter first name'
        }
        if (!req.body.hasOwnProperty('last_name') || req.body.last_name === '') {
            errors['last_name'] = 'Please enter last name'
        }
        if (!req.body.hasOwnProperty('email') || req.body.email === '') {
            errors['email'] = 'Please enter a valid email'
        }
        if (!req.body.hasOwnProperty('password') || req.body.password === '') {
            errors['password'] = 'Please enter password'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Validate google signup request
 */
async function validateGoogleSignup(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('google_first_name') || req.body.google_first_name === '') {
            errors['google_first_name'] = 'Please enter first name'
        }
        if (!req.body.hasOwnProperty('google_last_name') || req.body.google_last_name === '') {
            errors['google_last_name'] = 'Please enter last name'
        }
        if (!req.body.hasOwnProperty('google_email') || req.body.google_email === '') {
            errors['google_email'] = 'Please enter a valid email'
        }
        if (!req.body.hasOwnProperty('password') || req.body.password === '') {
            errors['password'] = 'Please enter password'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Validate signin request
 */
async function validateSignin(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('email') || req.body.email === '') {
            errors['email'] = 'Please enter a valid email'
        }
        if (!req.body.hasOwnProperty('password') || req.body.password === '') {
            errors['password'] = 'Please enter a valid password'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Validate google signin request
 */
async function validateGoogleSignin(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('google_id') || req.body.google_id === '') {
            errors['google_id'] = 'Please a select valid google account id'
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

async function validateForgotPassword(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('email') || req.body.email === '') {
            errors['email'] = 'Please enter a valid email'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Validate update user password
 */
async function validateUpdatePassword(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('password') || req.body.password === '') {
            errors['password'] = 'Please enter old password'
        }
        if (!req.body.hasOwnProperty('new_password') || req.body.new_password === '') {
            errors['new_password'] = 'Please enter new password'
        }
        if (!req.body.hasOwnProperty('confirm_password') || req.body.confirm_password === '') {
            errors['confirm_password'] = 'Please enter confirm password'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function
 * Validate confirm new password
 */
async function confirmNewPassword(req, res, next) {
    try {
        let errors = {}

        if (req.body.new_password !== req.body.confirm_password) {
            errors['invalid_confirmation'] = 'Please confirm new password'
        }
        if (Object.keys(errors).length > 0) {
            return res.status(200).json({
                error: true,
                errors: errors
            })
        }
        next()
    } catch (error) {
        console.log(error)
    }
}