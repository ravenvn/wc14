Teams = new Meteor.Collection("teams");
Matches = new Meteor.Collection("matches");
BetInfo = new Meteor.Collection("betinfo");
Questions = new Meteor.Collection("questions");
Answers = new Meteor.Collection("answers");
Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
        		return true;
        	}
});