var app = require('../../express');
var userModel = require('../model/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);




app.get ('/api/user/:userId', findUserById);
app.get ('/api/user', findAllUsers);
app.post('/api/user', createUser);
app.put ('/api/user/:userId', updateUser);
app.delete ('/api/user/:userId', deleteUser);
app.post  ('/api/login', passport.authenticate('local'), login);
app.post  ('/api/logout', logout);
app.post ('/api/register', register);
app.get ('/api/loggedin', loggedin);
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));


function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(function (user) {
            if(user){
                return done(null, user);
            }else {
                if (typeof email !== 'undefined'){
                    var email = profile.emails[0].value;
                }else{
                    email = null;
                }

                var newFacebookUser = {
                    username:  profile.displayName,
                    firstName: profile.name.givenName,
                    lastName:  profile.name.familyName,
                    email:     email,
                    facebook: {
                        id:    profile.id,
                        token: token
                    }
                };
                return userModel.createUser(newFacebookUser);
            }
        },function (err) {
            if (err) { return done(err); }
        })
        .then(
        function(user){
            return done(null, user);
        },
        function(err){
            if (err) { return done(err); }
        }
    );
}


function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function register (req, res) {
    // var user = req.body;
    // userModel
    //     .createUser(user)
    //     .then(
    //         function(user){
    //             if(user){
    //                 req.login(user, function(err) {
    //                     if(err) {
    //                         res.status(400).send(err);
    //                     } else {
    //                         res.json(user);
    //                     }
    //                 });
    //             }
    //         }
    //     );
    var userObj = req.body;
    userObj.roles = ["SELLER","BUYER"];
    userObj.password = bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req
                .login(user, function (status) {
                    res.send(status);
                });
        });
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function localStrategy(username, password, done) {
    // userModel
    //     .findUserByCredentials(username,password)
    //     .then(function (user) {
    //         if(user) {
    //             done(null, user);
    //         } else {
    //             done(null, false);
    //         }
    //     }, function (error) {
    //         done(error, false);
    //     });

    userModel
        .findUserByUsername(username)
        .then(function (user) {


           // / var check = bcrypt.compareSync(password, user.password);
            if(user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        },function (error) {
            console.log(error);
            return done(error, false);
        });
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {
    var user = req.body;
    userModel
        .updateUser(req.params.userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
            });
    }
}