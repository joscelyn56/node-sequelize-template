/*!
 * Utilities
 */

'use strict'

/**
 * Module dependencies.
 * @private
 */
const crypto = require('crypto')

/**
 * Module exports
 * @public
 */
module.exports.isValid = isValid
module.exports.getDate = getDate
module.exports.getDateOnly = getDateOnly
module.exports.generateRandomImageFileName = generateRandomImageFileName
module.exports.generateImageURL = generateImageURL
module.exports.paginate = paginate

/**
 * @function
 * Check if an object is valid
 * @param {json} response
 * @returns {boolean}
 */
function isValid(response) {
    return Object.keys(response).length !== 0 && response.constructor === Object
}

/**
 * @function
 * Get current date and time
 * @returns {date}
 */
function getDate() {
    let date = new Date()
    return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    )
}

/**
 * @function
 * Get current date only
 * @returns {date}
 */
function getDateOnly() {
    let date = new Date()
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}

/**
 * @function
 * Generate random string for otp verification
 * @param {int} length string length
 * @returns {string} randomString
 */
function randomString(length) {
    let result = ''
    let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/**
 * @function
 * Create a random file name for image
 * @param {string} file extension
 * @returns {string} hashed file name with extension
 */
function generateRandomImageFileName(fileExt) {
    // create pseudo random bytes
    var bytes = crypto.pseudoRandomBytes(32)
        // create the md5 hash of the random bytes
    var checksum = crypto
        .createHash('MD5')
        .update(bytes)
        .digest('hex')
        // return as filename the hash with the output extension
    return checksum + fileExt
}

function generateImageURL(fullUrl, imagePath, imageName) {
    return fullUrl + imagePath + imageName
}

function paginate(data, page) {
    let next_page = page + 1
    let prev_page = (page > 1) ? page - 1 : page
    let limit = 100
    let offset = (page === 1) ? 0 : prev_page * limit

    let total = Object.keys(data).length
    let total_pages = Math.ceil(total / limit)

    if (next_page > total_pages) next_page = total_pages

    return {
        next_page,
        prev_page,
        offset,
        limit
    }
}