Meteor.startup(function () {
    // code to run on server at startup
    process.env.MAIL_URL = "smtp://nanyangbk@gmail.com:nguoidensau@smtp.gmail.com:465/";

    Meteor.methods({
        getServerTime: function () {
            return new Date();
        }
    });

    // init users
    if (Meteor.users.find().fetch().length === 0) {
    	var users = [
    		{username: "Mickey", email: "vinh.ngo@jonckers.com", roles:['admin']},
    		{username: "Herve", email: "herve.baran@jonckers.com", roles:['admin']},
    		{username: "Ha_", email: "ha.do@jonckers.com", roles:[]}
    	];
    	_.each(users, function(userData) {
    		var id, user;
    		id = Accounts.createUser({
    			username: userData.username,
    			email: userData.email,
    			password: "12345678",
    			profile: {}
    		});
    		Roles.addUsersToRoles(id, userData.roles)
    	});
    }

    // init FIFA Worldcup teams
    // Teams.remove({});
    if (Teams.find().count() === 0) {
    	Teams.insert({name: "Brazil", group: "A", flag: "brazil.png"});
    	Teams.insert({name: "Croatia", group: "A", flag: "croatia.png"});
    	Teams.insert({name: "Mexico", group: "A", flag: "mexico.png"});
    	Teams.insert({name: "Cameroon", group: "A", flag: "cameroon.png"});

		Teams.insert({name: "Spain", group: "B", flag: "spain.png"});
		Teams.insert({name: "Netherlands", group: "B", flag: "netherlands.png"});
		Teams.insert({name: "Chile", group: "B", flag: "chile.png"});
		Teams.insert({name: "Australia", group: "B", flag: "australia.png"});

		Teams.insert({name: "Colombia", group: "C", flag: "colombia.png"});
		Teams.insert({name: "Greece", group: "C", flag: "greece.png"});
		Teams.insert({name: "Côte d'Ivoire", group: "C", flag: "cotedinvoire.png"});
		Teams.insert({name: "Japan", group: "C", flag: "japan.png"});

		Teams.insert({name: "Uruguay", group: "D", flag: "uruguay.png"});
		Teams.insert({name: "Costa Rica", group: "D", flag: "costarica.png"});
		Teams.insert({name: "England", group: "D", flag: "england.png"});
		Teams.insert({name: "Italy", group: "D", flag: "italy.png"});

		Teams.insert({name: "Switzerland", group: "E", flag: "switzerland.png"});
		Teams.insert({name: "Ecuador", group: "E", flag: "ecuador.png"});
		Teams.insert({name: "France", group: "E", flag: "france.png"});
		Teams.insert({name: "Honduras", group: "E", flag: "honduras.png"});

		Teams.insert({name: "Argentina", group: "F", flag: "argentina.png"});
		Teams.insert({name: "Bosnia and Herzegovina", group: "F", flag: "bosnia-herzegovina.png"});
		Teams.insert({name: "Iran", group: "F", flag: "iran.png"});
		Teams.insert({name: "Nigeria", group: "F", flag: "nigeria.png"});

		Teams.insert({name: "Germany", group: "G", flag: "germany.png"});
		Teams.insert({name: "Portugal", group: "G", flag: "portugal.png"});
		Teams.insert({name: "Ghana", group: "G", flag: "ghana.png"});
		Teams.insert({name: "USA", group: "G", flag: "usa.png"});

		Teams.insert({name: "Belgium", group: "H", flag: "belgium.png"});
		Teams.insert({name: "Algeria", group: "H", flag: "algeria.png"});
		Teams.insert({name: "Russia", group: "H", flag: "russia.png"});
		Teams.insert({name: "Korean Republic", group: "H", flag: "korean.png"});
    }

    // init round matches
    // Matches.remove({});
    if (Matches.find().count() === 0) {
    	Matches.insert({team1: {name:"Brazil", flag: "brazil.png"}, team2: {name:"Croatia", flag: "croatia.png"}, goal1: null, goal2: null, time: new Date("2014-6-12 17:00")});
    	Matches.insert({team1: {name:"Mexico", flag: "mexico.png"}, team2: {name:"Cameroon", flag: "cameroon.png"}, goal1: null, goal2: null, time: new Date("2014-6-13 13:00")});
    	Matches.insert({team1: {name:"Spain", flag: "spain.png"}, team2: {name:"Netherlands", flag: "netherlands.png"}, goal1: 3, goal2: 1, time: new Date("2014-6-13 16:00")});
    	Matches.insert({team1: {name:"Chile", flag: "chile.png"}, team2: {name:"Australia", flag: "australia.png"}, goal1: null, goal2: null, time: new Date("2014-6-13 18:00")});
    	Matches.insert({team1: {name:"Colombia", flag: "colombia.png"}, team2: {name:"Greece", flag: "greece.png"}, goal1: null, goal2: null, time: new Date("2014-6-14 13:00")});
    }
});