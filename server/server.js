Meteor.startup(function () {
    // code to run on server at startup
    process.env.MAIL_URL = "smtp://nanyangbk@gmail.com:nguoidensau@smtp.gmail.com:465/";
});