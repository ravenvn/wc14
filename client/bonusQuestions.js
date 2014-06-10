function addDays(date, days) {
  var d2 = new Date(date);
  d2.setDate(d2.getDate() + days);
  return d2;
}

Template.bonusQuestions.questions = function() {
	var now = new Date();
	var upcommingQuestions = [];
	var i = 1;
	var questions = Questions.find({}).fetch();
	questions.forEach(function (question) {
		if (question.time > now) {
			question.index = i++;
			var myAnswer = Answers.findOne({question_id: question._id, user_id: Meteor.userId()});
			if (myAnswer != null)
				question.myAnswer = myAnswer.answer;
			upcommingQuestions.push(question);
		}
	});

	return upcommingQuestions;
}

Template.bonusQuestions.events({
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