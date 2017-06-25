var app = require('../../express');
var universityModel = require('../model/university/university.model.server');





app.get ('/api/university/:universityId', findUniversityById);
app.get ('/api/university', findAllUniversities);
app.get ('/api/states', findAllStates);
app.post('/api/university', createUniversity);
app.put ('/api/university/:universityId', updateUniversity);
app.delete ('/api/university/:universityId', deleteUniversity);


function facebookStrategy(token, refreshToken, profile, done) {
    universityModel
        .findUniversityByFacebookId(profile.id)
        .then(function (university) {
            if(university){
                return done(null, university);
            }else {
                if (typeof email !== 'undefined'){
                    var email = profile.emails[0].value;
                }else{
                    email = null;
                }

                var newFacebookUniversity = {
                    universityname:  profile.displayName,
                    firstName: profile.name.givenName,
                    lastName:  profile.name.familyName,
                    email:     email,
                    facebook: {
                        id:    profile.id,
                        token: token
                    }
                };
                return universityModel.createUniversity(newFacebookUniversity);
            }
        },function (err) {
            if (err) { return done(err); }
        })
        .then(
        function(university){
            return done(null, university);
        },
        function(err){
            if (err) { return done(err); }
        }
    );
}


function loggedin(req, res) {
    res.send(req.isAuthenticated() ? req.university : '0');
}

function register (req, res) {
    // var university = req.body;
    // universityModel
    //     .createUniversity(university)
    //     .then(
    //         function(university){
    //             if(university){
    //                 req.login(university, function(err) {
    //                     if(err) {
    //                         res.status(400).send(err);
    //                     } else {
    //                         res.json(university);
    //                     }
    //                 });
    //             }
    //         }
    //     );
    var universityObj = req.body;
    universityObj.roles = ["SELLER","BUYER"];
    universityObj.password = bcrypt.hashSync(universityObj.password);
    universityModel
        .createUniversity(universityObj)
        .then(function (university) {
            req
                .login(university, function (status) {
                    res.send(status);
                });
        });
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function login(req, res) {
    var university = req.university;
    res.json(university);
}


function serializeUniversity(university, done) {
    done(null, university);
}

function deserializeUniversity(university, done) {
    universityModel
        .findUniversityById(university._id)
        .then(
            function(university){
                done(null, university);
            },
            function(err){
                done(err, null);
            }
        );
}


function localStrategy(universityname, password, done) {
    // universityModel
    //     .findUniversityByCredentials(universityname,password)
    //     .then(function (university) {
    //         if(university) {
    //             done(null, university);
    //         } else {
    //             done(null, false);
    //         }
    //     }, function (error) {
    //         done(error, false);
    //     });

    universityModel
        .findUniversityByUniversityname(universityname)
        .then(function (university) {


           // / var check = bcrypt.compareSync(password, university.password);
            if(university && bcrypt.compareSync(password, university.password)) {
                return done(null, university);
            } else {
                return done(null, false);
            }
        },function (error) {
            console.log(error);
            return done(error, false);
        });
}

function deleteUniversity(req, res) {
    var universityId = req.params.universityId;
    universityModel
        .deleteUniversity(universityId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUniversity(req, res) {
    var university = req.body;
    universityModel
        .updateUniversity(req.params.universityId, university)
        .then(function (status) {
            res.send(status);
        });
}

function createUniversity(req, res) {
    var university = req.body;
    university.password = bcrypt.hashSync(university.password);

    universityModel
        .createUniversity(university)
        .then(function (university) {
            res.json(university);
        }, function (err) {
            res.send(err);
        });
}

function findUniversityById(req, res) {
    var universityId = req.params['universityId'];
    universityModel
        .findUniversityById(universityId)
        .then(function (university) {
            res.json(university);
        });
}

function findAllUniversities(req, res) {
    var stateName = req.query['stateName'];
    if(stateName) {
        universityModel
            .findUniversityByStatename(stateName)
            .then(function (university) {
                if(university) {
                    res.json(university);
                } else {
                    res.sendStatus(404);
                }
            });
    } else {
        universityModel
            .findAllUniversities()
            .then(function (universities) {
                res.json(universities);
            });
    }
}


function findAllStates(req, res) {
    universityModel
        .findAllStates()
        .then(function (states) {
            res.json(states);
        });
}