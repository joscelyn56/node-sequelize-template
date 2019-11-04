/*!
 * User Service
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const User = require('../config/models').user
const UserService = require('./service')(User)

module.exports.User = UserService