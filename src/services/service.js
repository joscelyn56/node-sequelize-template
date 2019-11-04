/*!
 * Services structure
 */

'use strict'

module.exports = model => {
    var dbModel = model
    return {
        add(details) {
            return new Promise((resolve, reject) => {
                try {
                    let result = dbModel.create(details)
                    return resolve(result)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        update(updates, filters) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.update(updates, {
                        where: filters
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        get(filters, attributes) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findOne({
                        where: filters,
                        attributes: attributes
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getAll() {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findAll({})
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getMany(filters) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findAll({
                        where: filters
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        search(filters, attributes, order) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findAll({
                        where: filters,
                        order: order,
                        attributes: attributes
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getAllWithOrdered(order, offset, limit) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findAll({
                        order: order,
                        offset: offset,
                        limit: limit
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        getAllWithAttributes(filters, attributes, order, limit) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.findAll({
                        where: filters,
                        order: order,
                        attributes: attributes,
                        limit: limit
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        },
        delete(filters) {
            return new Promise((resolve, reject) => {
                try {
                    let response = dbModel.destroy({
                        where: filters
                    })
                    return resolve(response)
                } catch (err) {
                    return reject(err)
                }
            })
        }
    }
}