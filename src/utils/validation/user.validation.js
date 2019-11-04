/*!
 * User Validation
 */

'use strict'

/**
 * Module exports
 * @public
 */
module.exports.validateUpdateProfile = validateUpdateProfile
module.exports.validateInterest = validateInterest

/**
 * @function
 * Validate update interest request
 */
async function validateInterest(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('interests') || req.body.interests === [] || !Array.isArray(req.body.interests)) {
            errors['interests'] = 'Please select valid interests'
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
 * Validate update profile request
 */
async function validateUpdateProfile(req, res, next) {
    try {
        let errors = {}

        if (!req.body.hasOwnProperty('first_name') || req.body.first_name === '') {
            errors['first_name'] = 'Please enter first name'
        }
        if (!req.body.hasOwnProperty('last_name') || req.body.last_name === '') {
            errors['last_name'] = 'Please enter last name'
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