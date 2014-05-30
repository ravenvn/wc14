Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

var focusText = function(i) {
  i.focus();
  i.select();
};

Template.index.date = function() {
	var months = ["January", "February", "Match", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	return tomorrow.getDate() + " " + months[tomorrow.getMonth()];
}

Template.index.matches = function() {
	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	var tomorrowMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (match.time.getFullYear() == tomorrow.getFullYear() && match.time.getMonth() == tomorrow.getMonth() && match.time.getDate() == tomorrow.getDate()) {
			tomorrowMatches.push(match);
		}
	});

	for (var i = 0; i < tomorrowMatches.length; i++) {
		var bets = BetInfo.find({match_id: tomorrowMatches[i]._id}).fetch();
		var allBets = [];
		for (var j = 0; j < bets.length; j++) {
			var bet = Object();
			bet.no = j + 1;
			bet.name = Meteor.users.findOne({_id: bets[j].user_id}).username;
			bet.betGoal1 = bets[j].goal1;
			bet.betGoal2 = bets[j].goal2;
			allBets.push(bet);
		}
		tomorrowMatches[i].betInfo = allBets;
	}

	return tomorrowMatches;
}

function compareScore(a, b) {
	if (a.profile.score < b.profile.score) return -1;
	else if (a.profile.score > b.profile.score) return 1;
	return 0;
}

Template.index.ranks = function() {
	var users = Meteor.users.find({}).fetch();
	users.forEach(function (user) {
		if (user.profile.score == null) user.profile.score = 0;
	});
	users.sort(compareScore);
	var rank = 1;
	for (var i = 0; i < users.length; i++) {
		users[i].rank = rank;
		if (i == users.length - 1) rank++;
		else if (users[i].profile.score < users[i+1].profile.score) rank++;
	}

	return users;
}