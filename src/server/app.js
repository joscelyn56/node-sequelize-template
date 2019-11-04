const dotenv = require('dotenv');
dotenv.config();

const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')

const express = require('express')

const app = express()

app.set('trust proxy', 1)
app.use(cookieParser())
app.use(
    session({
        secret: 'node_app',
        resave: true,
        saveUninitialized: true
    })
)

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

function customHeaders(req, res, next) {
    app.disable('x-powered-by');
    res.setHeader('X-Powered-By', 'Sequelize Node App');
    next();
}

app.use(customHeaders);

const authApi = require('./../api/auth.api')
const userApi = require('./../api/user.api')

app.use('/auth', authApi)
app.use('/user', userApi)

module.exports = app