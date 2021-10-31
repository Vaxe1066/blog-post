var Posts = require('../models/posts');
var Comments = require('../models/comments');

var async = require('async');


exports.comments_posts_get = function(req,res, next){
    Comments.find({blog: {$eq: req.params.id} })
    .sort('timestamp')
    .populate('author')
    .lean()
    .exec(function (err, results){
        if(err) {return next(err); }
        res.json(results);
    })
}



exports.comments_posts_post = function(req,res, next){
    let comment = new Comments({
        author: req.body.author,
        blog: req.params.id,
        comment: req.body.comment
    })
    comment.save(function (err) {
        if(err) {return next(err); }
        //success
        res.json(comment)
    })
}


exports.comments_delete = function(req,res,next){
    Comments.findByIdAndRemove(req.params.id, function deleteComment(err){
        if(err) {return next(err)}
        //success of delete 
        res.sendStatus(200);
    })
}