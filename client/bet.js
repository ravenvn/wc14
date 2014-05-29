Template.bet.goals = function() {
	var goals = [];
	for (var i = 0; i <= 99; i++) {
		goals.push({goal: i});
	};

	return goals;
}

Template.bet.matches = function() {
	var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
	var tomorrowMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (match.time.getFullYear() == tomorrow.getFullYear() && match.time.getMonth() == tomorrow.getMonth() && match.time.getDate() == tomorrow.getDate()) {
			tomorrowMatches.push(match);
		}		
	});

	for (var i = 0; i < tomorrowMatches.length; i++) {
		var betInfo = BetInfo.findOne({match_id: tomorrowMatches[i]._id, user_id: Meteor.userId()});
		if (betInfo != null) {
			tomorrowMatches[i].betGoal1 = betInfo.goal1;
			tomorrowMatches[i].betGoal2 = betInfo.goal2;
		}	
	}

	return tomorrowMatches;
}

Template.bet.question = function() {
	return "How many red cards in this day?";
}

Template.bet.answer = function() {
	return "5";
}

Template.bet.events({
  'click .btn-bet': function(e, t) {
  	var goal1 = $('#' + e.currentTarget.id).closest('.row').find('.goals1:first').val();
  	var goal2 = $('#' + e.currentTarget.id).closest('.row').find('.goals2:first').val();

  	var betInfo = BetInfo.findOne({match_id: this._id, user_id: Meteor.userId()});
  	if (betInfo == null)
  		BetInfo.insert({match_id: this._id, user_id: Meteor.userId(), goal1: goal1, goal2: goal2});
  	else
  		BetInfo.update({_id: betInfo._id}, {$set: {goal1: goal1, goal2: goal2}});
    Meteor.flush();
  }
});