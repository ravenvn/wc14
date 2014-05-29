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
      Matches.update({_id: this._id}, {$set: {goal1: $.trim(goals[0]), goal2: $.trim(goals[1])}});
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
    Matches.remove({_id: this._id});
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