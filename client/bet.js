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

Template.bet.matches = function() {
	var now = new Date();
	var within24hMatches = [];
	var matches = Matches.find({}).fetch();
	matches.forEach(function (match) {
		if (now < match.time && now >= addDays(match.time, -1)) {
			within24hMatches.push(match);
		}
	});

	for (var i = 0; i < within24hMatches.length; i++) {
		var betInfo = BetInfo.findOne({match_id: within24hMatches[i]._id, user_id: Meteor.userId()});
		if (betInfo != null) {
			within24hMatches[i].betGoal1 = betInfo.goal1;
			within24hMatches[i].betGoal2 = betInfo.goal2;
		}
	}

	return within24hMatches;
}

Template.bet.questions = function() {
	var now = new Date();
	var tomorrowQuestions = [];
	var i = 1;
	var questions = Questions.find({}).fetch();
	questions.forEach(function (question) {
		if (now < question.time && now >= addDays(question.time, -1)) {
			question.index = i++;
			var yourAnswer = Answers.findOne({question_id: question._id, user_id: Meteor.userId()});
			if (yourAnswer != null)
				question.yourAnswer = yourAnswer.answer;
			tomorrowQuestions.push(question);
		}
	});

	return tomorrowQuestions;
}

Template.bet.events({
  'click .btn-bet': function(e, t) {
  	// check time for prevent cheating
	var now = new Date();
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
  },

  'click .btn-answer': function(e, t) {
  	// check time for prevent cheating
	var now = new Date();
	var match_time = Questions.findOne({_id: this._id}).time;
	if (now >= match_time) {
		alert("The question is expired. You can't answer anymore. Please refresh the page.");
		return;
	}

  	var answer_content = $('#' + e.currentTarget.id).closest('.row').find('input:first').val().trim();
  	var answer = Answers.findOne({question_id: this._id, user_id: Meteor.userId()});
  	if (answer == null)
  		Answers.insert({question_id: this._id, user_id: Meteor.userId(), answer: answer_content});
  	else
  		Answers.update({_id: answer._id}, {$set: {answer: answer_content}});
  }
});