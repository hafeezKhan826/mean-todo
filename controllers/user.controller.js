const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { validateUser } = require('../middlewares/validate');
var jwt = require('jsonwebtoken');
const secret = 'gladiator';

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;
    const userObj = { email, password }
    try {
        if (userObj && isValid(userObj)) {
            const userFound = await User.findOne({ email }, { password: 0 });
            if (!userFound) {
                const user = new User(userObj);
                user.password = user.generateHash(req.body.password);
                await user.save();
                const token = jwt.sign({
                    user,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
                }, secret)
                const response = {
                    token,
                    user,
                    status: 'success',
                    message: 'User registered Successfully',
                }
                res.send(response);
            } else {
                const response = {
                    status: 'error',
                    message: 'User with email id is already registered'
                }
                res.send(response)
            }
        } else {
            const response = {
                status: 'error',
                message: 'required details missing',
            }
            res.send(response);
        }
    } catch (error) {
        const response = {
            status: 'error',
            message: 'some error occurred',
        }
        res.send(response);
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            if (user.compareHash(password, user.password)) {
                const token = jwt.sign({
                    user,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 60)
                }, secret)
                const response = {
                    status: 'success',
                    user, token
                }
                res.send(response);
            } else {

                const response = {
                    status: 'error',
                    message: 'Incorrect password'
                }
                res.send(response);
            }
        }
        else {
            const response = {
                status: 'error',
                message: 'User not found'
            }
            res.send(response);
        }
    } catch (error) {
        res.send({ error })
    }
})

const isValid = (userObj) => Object.values(userObj).every(val => val !== '')


module.exports = router;