// // Authorized users can view secret
Meteor.publish("Teams", function () {
	return Teams.find();
});

Meteor.publish("Matches", function() {
	return Matches.find();
});

Meteor.publish("BetInfo", function() {
	return BetInfo.find();
});

Meteor.publish("Questions", function() {
	return Questions.find();
});

Meteor.publish("Answers", function() {
	return Answers.find();
});

Meteor.publish("Users", function () {
	return Meteor.users.find();
});
