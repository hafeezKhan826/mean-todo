const express = require('express');
const router = express.Router();
const { ToDo } = require('../models/to-do.model');
const { verifyToken } = require('../middlewares/validate');
var jwt = require('jsonwebtoken');
const secret = 'gladiator';

router.post('/add-todo', verifyToken, (req, res, next) => {
    try {
        const { email } = req.headers;
        const toDo = req.body;
        toDo.email = email;
        const newToDo = new ToDo(toDo);
        newToDo.save();
        const response = {
            status: 'success',
            message: 'To Added Successfully'
        }
        res.send(response)
    } catch (error) {
        res.send({ error })
    }
});
router.post('/change-status', verifyToken, async (req, res, next) => {
    const { todoId, status } = req.body;
    const { email } = req.headers;
    const todo = await ToDo.findOne({ email, _id: todoId })
    if (todo) {
        todo.update({
            status
        },
            (err, resu) => {
                if (err) res.send(err)
                todo.save();
                const response = {
                    status: 'success',
                    message: `to do status changed to ${status}`
                }
                res.send(response)
            }
        )

    } else {
        const response = {
            status: 'error',
            message: 'to do not found'
        }
        res.send(response)
    }
});

router.get('/get-todos', verifyToken, async (req, res, next) => {
    const { email } = req.headers;
    const todos = await ToDo.find({
        email
    })
    console.log(todos);
    const response = {
        status: 'success',
        items: todos
    }
    res.send(response)
});

// const isValid = (userObj) => Object.values(userObj).every(val => val !== '')


module.exports = router;