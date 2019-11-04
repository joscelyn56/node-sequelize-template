const express = require('express')
const router = express.Router()
const authJwt = require('./../utils/authJwt')
const {
    accountExists,
    isRegistered
} = require('./../middleware/auth.middleware')
const {
    validateSignup,
    validateSignin,
    validateForgotPassword,
    validateUpdatePassword,
    confirmNewPassword
} = require('./../utils/validation/auth.validation')
const authRepo = require('./../repository/auth.repository')

router.post('/signup', [validateSignup, accountExists], authRepo.signup)
router.post('/signin', [validateSignin, isRegistered], authRepo.signin)

router.post(
    '/forgot-password', [validateForgotPassword, isRegistered],
    authRepo.forgotPassword
)
router.post(
    '/update-password',
    authJwt.verifyToken, [validateUpdatePassword, confirmNewPassword],
    authRepo.changePassword
)

router.get('/delete/:user', authRepo.delete)

module.exports = router