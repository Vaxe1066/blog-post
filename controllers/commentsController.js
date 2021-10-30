var Posts = require('../models/posts');
var Comments = require('../models/comments');

var async = require('async');


exports.comments_posts_get = function(req,res){
    res.send("Not implemeneted")
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