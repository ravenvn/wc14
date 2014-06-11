Template.layout.isLoggedIn = function() {
	if (Meteor.user() != null) return true;
	return false;
}
