Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

var adminFilter = function() {
	if (!Roles.userIsInRole(Meteor.user(), 'admin')) {
		this.redirect('home');
	}
}

var loggedInFilter = function() {
	if (Meteor.user() == null) {
		this.redirect('home');
	}
}

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'index'
	});
	this.route('rules');
	this.route('bet', {
		onBeforeAction: loggedInFilter
	});
	this.route('bonusQuestions', {
		onBeforeAction: loggedInFilter
	});
	this.route('input_matches', {
		path: '/input-matches',
		template: 'input_matches',
		onBeforeAction: adminFilter
	});
	this.route('input_questions', {
		path: '/input-questions',
		template: 'input_questions',
		onBeforeAction: adminFilter
	})
});
