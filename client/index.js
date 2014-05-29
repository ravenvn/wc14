Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

var focusText = function(i) {
  i.focus();
  i.select();
};

Template.index.ranks = function() {
	// return Ranks.find()
	return [{name:"Herve.Baran", score:100, rank:1}, {name:"Ha.Do", score:99, rank:2}, {name:"Vinh.Ngo", score:98, rank:3}];
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
