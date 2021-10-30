var User = require('../models/user');

var async = require('async');


//get all users
exports.user_get = function(req,res){
    User.find()
    .sort('username')
    .lean()
    .exec(function (err, results){
        if(err) {return next(err); }
        res.json(results);
    })
}

//create new user post 
exports.user_new_post = function(req,res){
    let user = new User({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        admin: false
    })
    user.save(function (err) {
        if(err) {return next(err); }
        //success
        res.json(user)
    })

}