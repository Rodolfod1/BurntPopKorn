const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportCongig = require('../../passport');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');

const { authenticate } = require('passport');


const signToken = userID => {
    return JWT.sign({
        iss: "BurntPopkorn",
        sub: userID
    }, "BurntPopkorn", {expiresIn: "1h"})
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({username}, (err, user) => {
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if (user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
        else {
            const newUser = new User({username, password, role});
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else 
                    res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
                });
        }
    })
});

userRouter.post('/login', passport.authenticate('local', {session : false}), (req, res) => {
    if (req.isAuthenticated()) {
        // passport.authenticate attactches user to the req
        const {_id, username, role} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username, role}});
    }
});


module.exports = userRouter;