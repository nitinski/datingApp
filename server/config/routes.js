var users = require('../controllers/users.js');

var users_data = 
	[
		{
			db_user_id: 'nitinski', 
			db_user_name: 'nitin shah', 
			db_user_email: 'nitinski1@yahoo.com', 
			db_user_birthday: '08/12/65', 
			db_user_picture_url: './images/nitin.jpg', 
			db_user_gender: 'Male', 
			db_user_facebook_userid: '10102000053942728', 
			db_user_friends: [ {name: 'mellypo'}, {name: 'stevie'}],
			db_pending_endorsements: [ {requested_by: 'mellypo'}],
			db_user_endorsements: [],
		},
		{
			db_user_id: 'mellypo', 
			db_user_name: 'Melinda Po', 
			db_user_email: 'mellypo@gmail.com', 
			db_user_birthday: '04/21/1991',
			db_user_picture_url: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xtf1/v/t1.0-1/p50x50/11800210_10101896558114198_4979404179633781607_n.jpg?oh=c60c6602d6a703240caa171f389b9aca&oe=56BEEEFD&__gda__=1455506056_caaca1a857478570dd7269c6dadb6aae', 
			db_user_gender: 'Female', 
			db_user_facebook_userid: '10102000053942728', 
			db_user_friends: [ {name: 'nitinski'}],
			db_pending_endorsements: [ ],
			db_user_endorsements: [{endorsed_by: 'nitinski', endorsed_time: '04/21/1991 09:00', question: 'Is mellypo a trustworthy Dater?', answer: 'yes absolutely'}],
		},
		{
			db_user_id: 'stevie', 
			db_user_name: 'Steve', 
			db_user_email: 'stevie@gmail.com', 
			db_user_birthday: '04/21/1991',
			db_user_picture_url: './images/car2.jpg', 
			db_user_gender: 'Male', 
			db_user_facebook_userid: '10102000053942728', 
			db_user_friends: [ ],
			db_pending_endorsements: [ ],
			db_user_endorsements: [],
		},


	];
		

module.exports = function(app) {
	
	// GET requests
	// routes for /users
	app.get('/users', function(request, response) {
        //users.getAll(request, response);
   		response.json({users: users_data});

	})

	app.get('/users/friends/:user_id', function(request, response) {
		users.getFriends(request, response, users_data);
	})

	app.get('/users/:user_id', function(request, response) {
		users.getOne(request, response, users_data);
	})

	app.get('/users/remove/:user_id', function(request, response) {
		users.delete(request, response);
	})

	// POST requests
	app.post('/users/new/:user_id', function(request, response) {
		users.create(request, response, users_data);
	})

	app.post('/users/update/:user_id', function(request, response) {
		users.update(request, response);
	})

	// Endorsement routes
	app.post('/users/addEndorsement', function(request, response) {
		users.addEndorsement(request, response, users_data);
	})

	app.post('/endorsements/remove/:id', function(request, response) {
		endorsements.delete(request, response);
	})

	app.post('/users/addFriend', function(request, response) {
		users.addFriend(request, response, users_data);
	})

	app.post('/users/requestEndorsement', function(request, response) {
		users.requestEndorsement(request, response, users_data);
	})
}