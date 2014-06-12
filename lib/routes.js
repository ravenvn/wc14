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
	});
	this.route('manage_users', {
		path: '/manage-users',
		template: 'manage_users',
		onBeforeAction: adminFilter
	});
	this.route('detail', {
		path: '/detail/:_id',
		template: 'detail',
		data: function() {
			// get user by id
			var user = Meteor.users.findOne({_id: this.params._id});
			if (user == null) return null;

			// get all matches, sort by time descending
			var matches = Matches.find().fetch();
			matches.sort(function(a, b) {
				if (a.time > b.time) return -1;
				else if (a.time < b.time) return 1;
				return 0;
			});
			var i = 1;
			matches.forEach(function (match) {
				match.index = i++;
				var bet = BetInfo.findOne({match_id: match._id, user_id: user._id});
				var score = 0;
				if (bet != null) {
					match.betGoal1 = bet.goal1;
					match.betGoal2 = bet.goal2;
					if (match.goal1 != null && match.goal2 != null) {
						if (bet.goal1 == match.goal1 && bet.goal2 == match.goal2) // bet exactly
							score += 5;
						else {
							if (bet.goal1 == bet.goal2 && match.goal1 == match.goal2) // draw - draw
				            	score += 3;
			              	else if ((bet.goal1 - bet.goal2) * (match.goal1 - match.goal2) > 0) // win/lose - win/lose
				                score += 3;
				           	if (bet.goal1 == match.goal1 || bet.goal2 == match.goal2) // bet exactly 1 score
				                score += 1;
				        }
				    }
				}
				match.score = score;
			});
			user.matches = matches;

			// get all questions, sort by time descending
			var questions = Questions.find().fetch();
			questions.sort(function(a, b) {
				if (a.time > b.time) return -1;
				else if (a.time < b.time) return 1;
				return 0;
			});
			i = 1;
			questions.forEach(function (question) {
				question.index = i++;
				var answer = Answers.findOne({question_id: question._id, user_id: user._id});
				var bonus = 0;
				if (question.answer != null && answer != null && answer.answer != null && question.answer.toLowerCase() == answer.answer.toLowerCase()) {
						bonus = 1;					
				}
				if (answer != null && answer.answer != null) {
					question.userAnswer = answer.answer;
				}

				question.bonus = bonus;
			});
			user.questions = questions;
			user.totalScore = 0;
			if (user.profile.score != null)
				user.totalScore = user.profile.score;
			user.totalBonus = 0;
			if (user.profile.bonus != null)
				user.totalBonus = user.profile.bonus;

			return user;
		}		
	});
});
