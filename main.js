Teams = new Meteor.Collection("teams");
Matches = new Meteor.Collection("matches");
BetInfo = new Meteor.Collection("betinfo");
Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");

Meteor.users.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
});

Teams.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	}
});

Matches.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
});

Questions.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin');
	},
});

BetInfo.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: doc.user_id});
		if (!user) return false;
		var match = Matches.findOne({_id: doc.match_id});
		if (!match) return false;
		var betinfo = BetInfo.findOne({user_id: user._id, match_id: match._id});
		if (betinfo) return false;
		var now = new Date();
		if (now >= match.time) return false;
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: doc.user_id});
		if (!user) return false;
		var match = Matches.findOne({_id: doc.match_id});
		if (!match) return false;
		var now = new Date();
		if (now >= match.time) return false;
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
});

Answers.allow({
	insert: function(userId, doc) {
		var user = Meteor.users.findOne({_id: doc.user_id});
		if (!user) return false;
		var question = Questions.findOne({_id: doc.question_id});
		if (!question) return false;
		var answer = Answers.findOne({user_id: user._id, question_id: question._id});
		if (answer) return false;
		var now = new Date();
		if (now >= question.time) return false;
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: doc.user_id});
		if (!user) return false;
		var question = Questions.findOne({_id: doc.question_id});
		if (!question) return false;
		var now = new Date();
		if (now >= question.time) return false;
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
});