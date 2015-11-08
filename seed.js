/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var tumble = require('./tumble');

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));

var wipeDB = function() {
    var models = [User];
    var promiseArr = [];
    models.forEach(function(model) {
        promiseArr.push(model.find({}).remove().exec());
    });

    return Promise.all(promiseArr);
};

var seedUsers = function () {

    var users = [
        {
            email: 'jack@mulrow.com',
            password: 'jjj',
            intervals: '02750250' // hap-py birth-day to you
        },
        {
            email: 'eric@ho.com',
            password: 'jjjjjj',
            intervals: '04010156048305600424' // hap-py birth-day to you
        }
    ];

    return User.createAsync(users);

};

connectToDb.then(function () {
    wipeDB().then(function() {
      return User.findAsync({}); 
    }).then(function (users) {
        return seedUsers();
    }).then(function (users) {
        return User.findOneAsync({email: 'jack@mulrow.com'});
    }).then(function (user) {
        console.log(user);
        user.intervals = tumble.tumbleIntervals(user.intervals, user.password);
        return user.save();
    }).then(function(user) {
        console.log('updated user', user);
        return User.findOneAsync({email: 'eric@ho.com'});
    }).then(function (user) {
        console.log(user);
        user.intervals = tumble.tumbleIntervals(user.intervals, user.password);
        return user.save();
    }).then(function(user) {
        console.log('updated user', user);
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
