Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound',
	loadingTemplate: 'loading'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'index'
	});
	this.route('bet');
	this.route('input_matches', {
		path: '/input-matches',
		template: 'input_matches'
	});
	this.route('input_questions', {
		path: '/input-questions',
		template: 'input_questions'
	})
});
