var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137801.mlab.com:37801/heroku_c8clpq93'; // user yours
}
mongoose.connect(connectionString);
mongoose.Promise = require('q').Promise;