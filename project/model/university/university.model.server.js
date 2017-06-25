var mongoose = require('mongoose');
var universitySchema = require('./university.schema.server');
var universityModel = mongoose.model('GraduateUniversityModel', universitySchema);

var stateSchema = require('../state/state.schema.server');
var stateModel = mongoose.model('GraduateStateModel', stateSchema);

universityModel.createUniversity = createUniversity;
universityModel.findUniversityById = findUniversityById;
universityModel.findAllUniversities = findAllUniversities;
universityModel.findUniversityByStatename = findUniversityByStatename;
universityModel.updateUniversity = updateUniversity;
universityModel.deleteUniversity = deleteUniversity;
universityModel.findAllStates = findAllStates;


module.exports = universityModel;


function findAllStates() {
    return stateModel.find();
}


function createUniversity(university) {
    return universityModel.create(university);
}

function findUniversityById(universityId) {
    return universityModel.findById(universityId);
}

function findAllUniversities() {
    return universityModel.find();
}

function findUniversityByStatename(stateName) {
    return universityModel.find({stateName: stateName});
}

function updateUniversity(universityId, newUniversity) {
    return universityModel.update({_id: universityId}, {$set: newUniversity});
}

function deleteUniversity(universityId) {
    return universityModel.remove({_id: universityId});
}