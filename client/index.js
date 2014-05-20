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