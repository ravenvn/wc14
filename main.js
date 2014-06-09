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
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
});

Answers.allow({
	insert: function(userId, doc) {		
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	update: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
	remove: function(userId, doc) {
		var user = Meteor.users.findOne({_id: userId});
		return Roles.userIsInRole(user, 'admin') || doc.user_id === userId;
	},
});