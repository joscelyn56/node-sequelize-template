const db = require('./../src/config/models/index')

const request = require('supertest')
const app = require('../src/server/app')

let token = ''
let userId = ''

afterAll(() => {
    db.sequelize.close()
})

describe('Create new user', () => {
    test('It should signup successful ', async() => {
        await request(app)
            .post('/auth/signup')
            .send({
                email: 'test@test.com',
                password: 'Tester',
                first_name: 'Test',
                last_name: 'Test'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (!('error' in res.body) && !('msg' in res.body)) {
                    throw new Error('Response should contain error and msg.')
                } else if (res.body.error !== false && res.body.msg !== 'Sign up successful.') {
                    throw new Error('Invalid error and message response.')
                }
            })
    })
})

describe('Sign in created user', () => {
    test('It should show login successful', async() => {
        await request(app)
            .post('/auth/signin')
            .send({
                email: 'test@test.com',
                password: 'Tester'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (!('error' in res.body) && !('msg' in res.body)) {
                    throw new Error('Response should contain error and msg.')
                } else if (!('accessToken' in res.body)) {
                    throw new Error('Response should contain access token')
                }
                token = res.body.accessToken
            })
    })
    test('It should show a success message that password has been updated successfully.', async() => {
        await request(app)
            .post('/auth/update-password')
            .send({
                password: 'Tester',
                new_password: 'Tester2',
                confirm_password: 'Tester2'
            })
            .set({
                authorization: token,
                Accept: 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect({
                error: false,
                msg: 'Password updated successfully.'
            })
    })
})

describe('Get user details', () => {
    test('It should return all users.', async() => {
        await request(app)
            .get('/user/all')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if ('error' in res.body) {
                    throw new Error('Invalid error and data response.')
                }
            })
    })
    test('It should return user profile', async() => {
        await request(app)
            .get('/user/profile')
            .set({
                authorization: token,
                Accept: 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if ('error' in res.body) {
                    throw new Error('Invalid error and message response.')
                } else if (!('first_name' in res.body) &&
                    !('last_name' in res.body) &&
                    !('email' in res.body) &&
                    !('interests' in res.body)
                ) {
                    throw new Error('Response should contain first name, last name, email and interests.')
                }
                userId = res.body.userId
            })
    })
    test('It should update user profile and success message', async() => {
        await request(app)
            .post('/user/update-profile')
            .send({
                first_name: 'Test',
                last_name: 'Test2'
            })
            .set({
                authorization: token,
                Accept: 'application/json'
            })
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.error !== false) {
                    throw new Error('Invalid error and message response.')
                } else if (!('first_name' in res.body.user) && !('last_name' in res.body.user)) {
                    throw new Error('Response should contain first name and last name')
                }
            })
    })
})

describe('Clear up created user', () => {
    test('It should return a success message that account has been deleted.', async() => {
        await request(app)
            .get('/auth/delete/' + userId)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect({
                error: false,
                msg: 'User deleted successfully.'
            })
    })
})