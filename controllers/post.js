var express = require('express');
var db = require('../models');

var router = express.Router();


//function to show all posts
router.get('/posts', function(req, res) {
	db.post.findAll({
		include: [db.person]
	}).then(function(posts) {
		console.log(posts);
		res.render('posts', {posts: posts, alerts: req.flash()});
	});
});


//functiont to post new posts
router.post('/newposts', function(req, res){
	console.log(req.body);

	db.person.find({
		where: { username: currentUser.username}
	}).then(function(user) {
		person.createPost({
			content: req.body.content
		}).then(function(post) {
			res.redirect('/posts');
		});
	}).catch(function(err) {
		res.send(err);
	});
});


module.exports = router;