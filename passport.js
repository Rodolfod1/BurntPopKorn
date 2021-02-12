const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

// authorization to protect resource
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'BurntPopkorn'
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if (err)
            return done(err, false);
        if (user)
            return done(null, user);
        else 
            return done(null, false);
    });
}));

// These parameters come from the user. They are the username and password they are trying
// to sign in with.

// Authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username}, (err, user) => {
        // Something went wrong with DB
        if (err) 
            return done(err);
        // If no user exists
        if (!user)
            return done(null, false)
        // Custum method from the user model
        // Check if password is correct
        user.comparePasssword(password, done);
    })
}));