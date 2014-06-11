function addDays(date, days) {
  var d2 = new Date(date);
  d2.setDate(d2.getDate() + days);
  return d2;
}

Template.bet.goals = function() {
	var goals = [];
	for (var i = 0; i <= 99; i++) {
		goals.push({goal: i});
	};

	return goals;
}

Template.bet.upcomingMatches = function() {
	var now = new Date();
	var upcomingMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (match.time > now) {
			upcomingMatches.push(match);
		}
	});

	for (var i = 0; i < upcomingMatches.length; i++) {
		var betInfo = BetInfo.findOne({match_id: upcomingMatches[i]._id, user_id: Meteor.userId()});
		if (betInfo != null) {
			upcomingMatches[i].betGoal1 = betInfo.goal1;
			upcomingMatches[i].betGoal2 = betInfo.goal2;
		}
	}

	return upcomingMatches;
}


Template.bet.events({
  'click .btn-bet': function(e, t) {
  	// check time for prevent cheating
	// var now = new Date();
	var now = Session.get("time");
	var match_time = Matches.findOne({_id: this._id}).time;
	if (now >= match_time) {
		alert("This match has already started. You can't bet anymore. Please refresh the page.");
		return;
	}

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