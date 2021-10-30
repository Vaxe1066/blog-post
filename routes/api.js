var express = require('express');
var router = express.Router();
const path = require('path');

// Require controller modules.
var posts_controller = require('../controllers/postsController');
var user_controller = require('../controllers/userController');
var comments_controller = require('../controllers/commentsController');

const { verifySignUp } = require("../middlewares");
const auth_controller = require("../controllers/auth.controller");



//routes for authentication
router.post('/auth/signup', [verifySignUp.checkDuplicateUsername], auth_controller.signup) 
router.post("/auth/signin", auth_controller.signin);
//routes for user - user routes

router.get('/users', user_controller.user_get);

router.post('/users/new', user_controller.user_new_post);



//the route for blog posts - posts routes 

router.get('/posts', posts_controller.posts_list_get);

router.post('/posts', posts_controller.posts_new_post);

router.get('/posts/:id', posts_controller.posts_detail_get);

router.delete('/posts/:id', posts_controller.posts_detail_delete);



// the comments route

//get comments for a particular post
router.get('/posts/:id/comments', comments_controller.comments_posts_get);

//add comments to a particular post
router.post('/posts/:id/comments', comments_controller.comments_posts_post);

router.delete('/comments/:id', comments_controller.comments_delete);


module.exports = router;