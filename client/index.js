Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

var focusText = function(i) {
  i.focus();
  i.select();
};

function addDays(date, days) {
  var d2 = new Date(date);
  d2.setDate(d2.getDate() + days);
  return d2;
}

// Template.index.date = function() {
// 	var months = ["January", "February", "Match", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// 	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
// 	return tomorrow.getDate() + " " + months[tomorrow.getMonth()];
// }

Template.index.upcomingMatches = function() {
	var now = new Date();
	var upcomingMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (match.time > now) {
			upcomingMatches.push(match);
		}
	});

	for (var i = 0; i < upcomingMatches.length; i++) {
		var bets = BetInfo.find({match_id: upcomingMatches[i]._id}).fetch();
		var allBets = [];
		for (var j = 0; j < bets.length; j++) {
			var bet = Object();
			bet.no = j + 1;
			bet.name = Meteor.users.findOne({_id: bets[j].user_id}).username;
			bet.betGoal1 = bets[j].goal1;
			bet.betGoal2 = bets[j].goal2;
			allBets.push(bet);
		}
		upcomingMatches[i].betInfo = allBets;
	}

	return upcomingMatches;
}

Template.index.last24hMatches = function() {
	var now = new Date();
	var last24hMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (match.time < now && match.time >= addDays(now, -1)) {
			last24hMatches.push(match);
		}
	});

	for (var i = 0; i < last24hMatches.length; i++) {
		var bets = BetInfo.find({match_id: last24hMatches[i]._id}).fetch();
		var allBets = [];
		for (var j = 0; j < bets.length; j++) {
			var bet = Object();
			bet.no = j + 1;
			bet.name = Meteor.users.findOne({_id: bets[j].user_id}).username;
			bet.betGoal1 = bets[j].goal1;
			bet.betGoal2 = bets[j].goal2;
			allBets.push(bet);
		}
		last24hMatches[i].betInfo = allBets;
	}

	return last24hMatches;
}

function compareScore(a, b) {
	if (a.score > b.score) return -1;
	else if (a.score < b.score) return 1;
	return 0
;}

Template.index.ranks = function() {
	var users = Meteor.users.find({}).fetch();
	users.forEach(function (user) {
		if (user.profile.score == null) user.profile.score = 0;
		if (user.profile.bonus == null) user.profile.bonus = 0;
		user.score = user.profile.score + user.profile.bonus;
	});
	users.sort(compareScore);
	var rank = 1;
	for (var i = 0; i < users.length; i++) {
		users[i].rank = rank;
		if (i == users.length - 1) rank++;
		else if (users[i].score > users[i+1].score) rank++;
	}

	return users;
}