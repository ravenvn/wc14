var focusText = function(i) {
  i.focus();
  i.select();
};

Template.index.ranks = function() {
	// return Ranks.find()
	return [{name:"Herve.Baran", score:100, rank:1}, {name:"Ha.Do", score:99, rank:2}, {name:"Vinh.Ngo", score:98, rank:3}];
};

Template.index.pridicts = function() {
	return [{no:1, name:"Herve.Baran", score:"2 - 1"},{no:2, name:"Ha.Do", score:"0 - 2"}, {no:3, name:"Vinh.Ngo", score:"1 - 1"}];
}

Template.bet.goals = function() {
	var goals = [];
	for (var i = 0; i <= 99; i++) {
		goals.push({goal: i});
	};

	return goals;
}

Template.bet.matches = function() {
	var matches = [];
	for (var i = 0; i < 4; i++) {
		matches.push({date: "Thursday 21 June", team1: "Brazil"+i, team2: "Spain"+i, goal1: 2, goal2: 1});
	};

	return matches;
}

Template.bet.question = function() {
	return "How many red cards in this day?";
}

Template.bet.answer = function() {
	return "5";
}

Template.input_matches.matches = function() {
	var matches = [];
	for (var i = 1; i <= 5; i++) {
		matches.push({no: i, team1: "Argentina "+i, team2: "Germany "+i, score: "2 - "+i, time: "Tuesday 17 June"});
	}

	return matches;
}

Session.set('adding', false);

Template.input_matches.adding = function() {
	return Session.equals("adding", true);
}

Template.input_matches.events({
  'click #btn-add': function(e, t) {
    Session.set('adding', true);
    Meteor.flush();
    focusText(t.find("#add-team1"));
  },

  'click #btn-save': function(e, t) {
  	Session.set('adding', false);
  	Meteor.flush();  	
  },

  'click #btn-cancel': function(e, t) {
  	Session.set('adding', false);
  	Meteor.flush();  	
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