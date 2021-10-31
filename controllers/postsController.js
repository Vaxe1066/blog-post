var Posts = require('../models/posts');
var Comments = require('../models/comments');

var async = require('async');


//get all posts 
exports.posts_list_get = function(req,res, next) { 
    Posts.find()
    .sort('timestamp')
    .populate('author')
    .lean()
    .exec(function (err, results){
        if(err) {return next(err); }
        res.json(results);
    })
}


//get individual post
exports.posts_detail_get = function(req,res, next) { 
    Posts.findById(req.params.id)
    .populate('author')
    .lean()
    .exec(function (err, results){
        if(err) {return next(err)}
        //success 
        res.json(results)
    })
}


//create new post 
exports.posts_new_post = function(req,res, next){
    let post = new Posts({
        author: req.body.author,
        blog: req.body.blog,
        title: req.body.title
    })
    post.save(function (err) {
        if(err) {return next(err); }
        //success
        res.json(post)
    })
}


// delete a specific post - on post deletion all comments should be deleted how this is handled to the client is a front end issue.
exports.posts_detail_delete = function(req,res, next){ 
    async.parallel({
        comments: function(callback){
            Comments.deleteMany({blog: req.params.id}).exec(callback)
        },
        post: function(callback){
            Posts.findByIdAndRemove(req.params.id).exec(callback)
        },
    }, function(err, results){
        if(err) {return next(err)}
        if(results.post==null) { //No Results
            var err = new Error('Item Not Found');
            err.status = 404;
            return next(err)
        }
        //success of deletion
        res.sendStatus(200);

    }
    
    
    )

}