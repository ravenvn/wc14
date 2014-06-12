Meteor.startup(function () {
    setInterval(function () {
        Meteor.call("getServerTime", function (error, result) {
            Session.set("time", result);
        });
    }, 1000);
});

Template.layout.isLoggedIn = function() {
	if (Meteor.user() != null) return true;
	return false;
}