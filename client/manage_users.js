Template.manage_users.users = function() {
	var users = Meteor.users.find({}).fetch();
	var i = 1;
	users.forEach(function (user) {
		user.index = i++;
		user.email = user.emails[0].address;
	});

	return users;
}

Template.manage_users.events({
	'click .delete_item': function() {
    	var confirm = window.confirm("Do you really want to delete this question?");
	    if (confirm == true) {
	      // remove this user
	      Meteor.users.remove({_id: this._id});

	      // remove all answer of this user
	      var deleted_answers = Answers.find({user_id: this._id}).fetch();
	      deleted_answers.forEach(function (deleted_answer) {
	        Answers.remove({_id: deleted_answer._id});
	      });

	      // remove all betinfo of this user
	      var deleted_betInfo = BetInfo.find({user_id: this._id}).fetch();
	      deleted_betInfo.forEach(function (bet) {
	      	BetInfo.remove({_id: bet._id});
	      });
	    }
  	}
});