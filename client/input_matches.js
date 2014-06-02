Template.input_matches.matches = function() {
  var matches = Matches.find({}).map(function(doc, index, cursor) {
    var i = _.extend(doc, {index: index + 1});
    return i;
  });;

	return matches;
}

Session.set('adding', false);

Template.input_matches.adding = function() {
	return Session.equals("adding", true);
}

Template.input_matches.editing = function() {
  return Session.equals("score_input", this._id);
}

Template.input_matches.events({
  'click #btn-add': function(e, t) {
    if (!Session.equals("adding", true)) {
      Session.set('adding', true);
      Meteor.flush();
      t.findAll('#datetimepicker').datetimepicker();
    }
  },

  'click #btn-save': function(e, t) {
  	Session.set('adding', false);
    Matches.insert({team1: {name: $('#team1 option:selected').text(), flag: $('#team1').val()}, team2: {name:$('#team2 option:selected').text(), flag: $('#team2').val()}, time: new Date($('#time').val())});
  	Meteor.flush();
  },

  'click #btn-cancel': function(e, t) {
  	Session.set('adding', false);
  	Meteor.flush();
  },

  'click .score': function(e, t) {
    Session.set('score_input', this._id);
    Meteor.flush();
    t.findAll("#edit_score").focus();
  },

  'keyup #edit_score': function(e, t) {
    if (e.which === 13) {
      var goals = $('#edit_score').val().split("-");
      var goal1 = $.trim(goals[0]);
      var goal2 = $.trim(goals[1]);
      var match_id = this._id;
      if (goal1 != parseInt(goal1) || goal2 != parseInt(goal2) ) {
        goal1 = null;
        goal2 = null;
      }

      // update match score
      Matches.update({_id: match_id}, {$set: {goal1: goal1, goal2: goal2}});
      
      // update user score
      var users = Meteor.users.find({}).fetch();
      users.forEach(function (user) {
        var score = 0;
        var betInfo = BetInfo.find({user_id: user._id}).fetch();
        betInfo.forEach(function (bet) {
          var match = Matches.findOne({_id: bet.match_id});
          if (match != null && match.goal1 != null && match.goal2 != null) {
            if (bet.goal1 == match.goal1 && bet.goal2 == goal2) // bet exactly
              score += 5;
            else {
              if (bet.goal1 == bet.goal2 && match.goal1 == match.goal2) // draw - draw
                score += 3;
              else if ((bet.goal1 - bet.goal2) * (match.goal1 - match.goal2) > 0) // win/lose - win/lose
                score += 3;
              if (bet.goal1 == match.goal1 || bet.goal2 == match.goal2) // bet exactly 1 score
                score += 1;
            }
          }
        });
        Meteor.users.update({_id: user._id}, {$set: {"profile.score": score}});        
      });

      Session.set('score_input', null);
    }
    if (e.which === 27) {
      Session.set('score_input', null);
    }
  },

  'focusout #edit_score': function(e, t) {
    Session.set('score_input', null);
  },

  'click .delete_item': function() {
    var confirm = window.confirm("Do you really want to delete this match?");
    if (confirm == true) {
      // remove this match
      Matches.remove({_id: this._id});
      var betInfo = BetInfo.find({match_id: this._id}).fetch();
      // remove all bet info of this match
      betInfo.forEach(function (bet) {
        BetInfo.remove({_id: bet._id});
      });

      // re-calculate score of users
      // update user score
      var users = Meteor.users.find({}).fetch();
      users.forEach(function (user) {
        var score = 0;
        var betInfo = BetInfo.find({user_id: user._id}).fetch();
        betInfo.forEach(function (bet) {
          var match = Matches.findOne({_id: bet.match_id});
          if (match != null && match.goal1 != null && match.goal2 != null) {
            if (bet.goal1 == match.goal1 && bet.goal2 == goal2) // bet exactly
              score += 5;
            else {
              if (bet.goal1 == bet.goal2 && match.goal1 == match.goal2) // draw - draw
                score += 3;
              else if ((bet.goal1 - bet.goal2) * (match.goal1 - match.goal2) > 0) // win/lose - win/lose
                score += 3;
              if (bet.goal1 == match.goal1 || bet.goal2 == match.goal2) // bet exactly 1 score
                score += 1;
            }
          }
        });
        Meteor.users.update({_id: user._id}, {$set: {"profile.score": score}});        
      });
    }
  }
  // 'keyup #add-category': function(e, t) {
  //   if (e.which === 13) {
  //     var catVal = String(e.target.value || "");
  //     if (catVal) {
  //       lists.insert({Category: catVal, owner:Meteor.userId()});
  //       Session.set('adding_category', false);
  //     }
  //   }
  // },
  // 'focusout #add-category': function(e, t) {
  //   Session.set('adding_category', false);
  // },
  // 'click .category': selectCategory
});

Template.input_matches.teams = function() {
  return Teams.find({});
}

Template.input_matches.goals = function() {
  var goals = [];
  for (var i = 0; i <= 99; i++) {
    goals.push({goal: i});
  };

  return goals;
}