const express = require('express')
const router = express.Router()
const authJwt = require('./../utils/authJwt')
const {
    validateInterest,
    validateUpdateProfile
} = require('./../utils/validation/user.validation')
const userRepo = require('./../repository/user.repository')

router.get('/all', userRepo.getAllUsers)
router.get('/profile', authJwt.verifyToken, userRepo.getProfile)
router.post(
    '/update-profile',
    authJwt.verifyToken, [validateUpdateProfile],
    userRepo.updateProfile
)

module.exports = router