const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../../passport');
const JWT = require('jsonwebtoken');
const User = require('../../models/User');
const Movie = require('../../models/movie');

const { authenticate } = require('passport');

// JSON Web token attachtd to requests
const signToken = userID => {
    return JWT.sign({
        iss: "BurntPopkorn",
        sub: userID
    }, "BurntPopkorn", {expiresIn: "1h"})
}

// Register a new User
userRouter.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.findOne({username}, (err, user) => {
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        if (user)
            res.status(400).json({message: {msgBody: "Username is already taken", msgError: true}});
        else {
            const newUser = new User({username, password});
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else 
                    res.status(201).json({message: {msgBody: "Account successfully created", msgError: false}});
                });
        }
    })
});

// Log in an existing user
userRouter.post('/login', passport.authenticate('local', {session : false}), (req, res) => {
    if (req.isAuthenticated()) {
        // passport.authenticate attactches user to the req
        const {_id, username } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {username}});
    }
});

// Log out the current user
userRouter.get('/logout', passport.authenticate('jwt', {session : false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success: true});
});

// Post a movie
userRouter.post('/movie', passport.authenticate('jwt', {session : false}), (req, res) => {
    const movie = new Movie(req.body);
    movie.save(err => {
        if (err)
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
            req.user.movies.push(movie);
            req.user.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
                else {
                    res.status(200).json({message: {msgBody: "Successfully added movie", msgError: false}});
                }
            })
        }
    })
});

// Update a Movie
userRouter.put('/updatemovie/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
    Movie.findByIdAndUpdate({_id: req.params.id}, 
        // Right now, it updates the review, rating, and favorite all at once
        {$set: {review: req.body.review, userRating: req.body.userRating, favorite: req.body.favorite}},
         err => {
        if (err) 
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else
            res.status(200).json({message: {msgBody: "Successfully updated movie", msgError: false}});
    })
})

// Get a movie by ID
userRouter.get('/getmovie/:id', (req, res, next) => {
    Movie.findById({_id: req.params.id}, (err, post) => {
        if (err) return next(err);
        res.json(post)
    });
});

// Delete a movie
userRouter.delete('/deletemovie/:id', (req, res, next) => {
    Movie.findByIdAndDelete({_id: req.params.id}, (err, response) => {
        if (err)
        res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
        res.status(200).json({message: {msgBody: "Successfully deleted movie", msgError: false}});
    }
        // This works but is boring
        // if (err) return next(err);
        // res.json(response)
    });
});

// Get all movies of current user
userRouter.get('/movies', passport.authenticate('jwt', {session : false}), (req, res) => {
    // Populate gets all the data from movies, not just the ids
    User.findById({_id: req.user._id}).populate('movies').exec((err, document) => {
        if (err) 
            res.status(500).json({message: {msgBody: "Error has occured", msgError: true}});
        else {
            res.status(200).json({movies: document.movies, authenticated: true});
        }
    });
});

// Check if there is a user signed in
userRouter.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res) => {
    const {username} = req.user;
    res.status(200).json({isAuthenticated: true, user: {username}});
});

module.exports = userRouter;