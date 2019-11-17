const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = 'gladiator';

exports.verifyToken = async (req, res, next) => {
    const { email, token } = req.headers;

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            res.send(err)
        }
        const user = await User.find({ email });
        if (user) {
            console.log({ user });
            next();
        } else {
            res.send({
                status: 'error',
                message: 'unauthorized'
            })
        }
    })

}

exports.authorizationCheck = async (req, res, next) => {
    const { email } = req.headers;

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            res.send(err)
        }
        const user = await User.find({ email });
        if (user) {
            console.log({ user });
            next();
        } else {
            res.send({
                status: 'error',
                message: 'unauthorized'
            })
        }
    })

}