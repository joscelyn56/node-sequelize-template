/*!
 * User Repository
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

function UserRepository() {}

UserRepository.prototype.getAllUsers = async(req, res) => {
    try {
        let users = await User.getAllWithOrdered([
            ['createdAt', 'DESC']
        ])
        let response = Object.assign({}, users)
        if (Utils.isValid(response)) {
            return res.status(200).send(users)
        }
        return res.status(200).json([])
    } catch (err) {
        console.error(err)
        throw err
    }
}

UserRepository.prototype.getProfile = async(req, res) => {
    let userId = req.userId

    try {
        await User.get({
            userId: userId
        }, ['userId', 'first_name', 'last_name', 'email', 'interests']).then(user => {
            let response = Object.assign({}, user)
            if (Utils.isValid(response)) {
                return res.status(200).send(user)
            }
            return res.status(200).json({
                error: true,
                msg: 'User not found.'
            })
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

UserRepository.prototype.updateProfile = async(req, res) => {
    let userId = req.userId
    let first_name = req.body.first_name
    let last_name = req.body.last_name

    try {
        await User.get({
            userId: userId
        }, ['id', 'userId', 'first_name', 'last_name', 'email', 'interests']).then(user => {
            let response = Object.assign({}, user)
            if (Utils.isValid(response)) {
                user.first_name = first_name
                user.last_name = last_name
                user.updatedAt = Utils.getDate()
                user.save()

                return res.status(200).send({
                    error: false,
                    user: user
                })
            }
            return res.status(200).json({
                error: true,
                msg: 'An error occured while updating profile. Please try again'
            })
        })
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = new UserRepository()