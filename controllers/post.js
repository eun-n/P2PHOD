var express = require('express');
var db = require('../models');

var router = express.Router();

router.get('/posts', function(req, res) {
	if(!req.currentUser) {
		req.flash('danger', 'You must be logged in to view this page.');
		res.redirect('/');
	}


	db.post.findAll({
		include: [db.person]
	}).then(function(posts) {
		console.log(posts);
		res.render('posts', {posts: posts, alerts: req.flash()});
	});
});

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