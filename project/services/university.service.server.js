var app = require('../../express');
var universityModel = require('../model/university/university.model.server');

app.get ('/api/university/:universityId', findUniversityById);
app.get ('/api/university', findAllUniversities);
app.get ('/api/states', findAllStates);
app.post('/api/university', createUniversity);
app.put ('/api/university/:universityId', updateUniversity);
app.delete ('/api/university/:universityId', deleteUniversity);


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