Template.input_questions.questions = function() {
  var questions = Questions.find({}).fetch();
  var i = 1;
  questions.forEach(function (question) {
    question.index = i++;
  });
  
	return questions;
}

Session.set('adding', false);

Template.input_questions.adding = function() {
	return Session.equals("adding", true);
}

Template.input_questions.editing = function() {
  return Session.equals("answer_input", this._id);
}

Template.input_questions.events({
  'click #btn-add': function(e, t) {
    if (!Session.equals("adding", true)) {
      Session.set('adding', true);
      Meteor.flush();
      t.findAll('#datetimepicker').datetimepicker();
    }
  },

  'click #btn-save': function(e, t) {
  	Session.set('adding', false);
    Questions.insert({question: $('#add_question').val().trim(),time: new Date($('#time').val())});
  	Meteor.flush();
  },

  'click #btn-cancel': function(e, t) {
  	Session.set('adding', false);
  	Meteor.flush();
  },

  'click .answer': function(e, t) {
    Session.set('answer_input', this._id);
    Meteor.flush();
    t.findAll("#edit_answer").focus();
  },

  'keyup #edit_answer': function(e, t) {
    if (e.which === 13) {
      var the_answer = $('#edit_answer').val().trim();
      // update answer of this question
      Questions.update({_id: this._id}, {$set: {answer: the_answer}});

      // update user score
      var users = Meteor.users.find({}).fetch();
      users.forEach(function (user) {        
        var bonus = 0;
        
        // calculate socre by bonus questions
        var answers = Answers.find({user_id: user._id}).fetch();
        answers.forEach(function (answer) {
          var question = Questions.findOne({_id: answer.question_id});          
          if (question != null && question.answer != null && answer.answer != null) {
            var answers_array = question.answer.split("|");
            for(var i = 0; i < answers_array.length; i++) {
              if (answers_array[i].toLowerCase().trim() == answer.answer.toLowerCase()) {
                bonus++;
                break;
              }
            }
          }           
        });
        Meteor.users.update({_id: user._id}, {$set: {"profile.bonus": bonus}});        
      });

      Session.set('answer_input', null);
    }
    if (e.which === 27) {
      Session.set('answer_input', null);
    }
  },

  'focusout #edit_answer': function(e, t) {
    Session.set('answer_input', null);
  },

  'click .delete_item': function() {
    var confirm = window.confirm("Do you really want to delete this question?");
    if (confirm == true) {
      // remove this question
      Questions.remove({_id: this._id});
      
      var deleted_answers = Answers.find({question_id: this._id}).fetch();
      // remove all answers of this question
      deleted_answers.forEach(function (deleted_answer) {
        Answers.remove({_id: deleted_answer._id});
      });

      // re-calculate bonus of users
      // update user bonus
      var users = Meteor.users.find({}).fetch();
      users.forEach(function (user) {
        var bonus = 0;
        
        // calculate socre by bonus questions
        var answers = Answers.find({user_id: user._id}).fetch();
        answers.forEach(function (answer) {
          var question = Questions.findOne({_id: answer.question_id});
          if (question != null && question.answer != null && answer.answer != null && question.answer.toLowerCase() == answer.answer.toLowerCase())
            bonus++;
        });
        Meteor.users.update({_id: user._id}, {$set: {"profile.bonus": bonus}});        
      });
    }
  }
});

