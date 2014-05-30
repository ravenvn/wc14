Teams = new Meteor.Collection("teams");
Matches = new Meteor.Collection("matches");
BetInfo = new Meteor.Collection("betinfo");
Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
        		return true;
        	}
});