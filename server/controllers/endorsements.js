var mongoose = require('mongoose');
var User = mongoose.model('Endorsement');

module.exports = {
	getAll: function(request, response) {
		  console.log("inside endorsements.getAll"  + request.params.user_id);
		  Endorsement.find({"db_endorsement_endorser": request.params.user_id}, function(err, endorsements) {
		    if(err)
		    {
		        response.json({message: "Error occured during database.find():" + err});    
		    }
		    else {
		    	//console.log(users.length);
		        response.json({endorsements: endorsements});
		    }
		  })
	},

	// notice that the function is app.get(...) why do you think the function is called get?
	create: function(request, response) {
	    console.log("inside post /endorsements/new/:user_id " + request.params.user_id);
	    // Make User object 
	    User.find({"_id": request.params.user_id}, function(err, users) {
	      console.log("===" + users.length);
	      var user = new User({
							      	db_user_name: request.params.user_name, 
							      	db_user_email: request.params.user_email, 
							      	db_user_birthday: request.params.user_birthday, 
							      	db_user_picture_url: request.params.user_picture_url, 
							      	db_user_gender: request.params.user_gender, 
							      	db_user_facebook_userid: request.params.user_facebook_userid, 
							      	db_user_created_date: new Date()});

	      user.save(function(err) {
	      // if there is an error console.log that something went wrong!
	          if(err) {
	            console.log('Error: ' + err);
	          } else { // else console.log that we did well and then redirect to the root route
	            console.log('successfully added a user - ' + request.params.user_name);
	            response.redirect('/');
	          }
	      })
	    });
	},

	delete: function(request, response) {
		console.log("inside post /users/:id/destroy " + request.params.user_id);
	    // Make user object 
	    User.remove({"_id": request.params.user_id}, function (err){
	          if(err) {
	            console.log('Error: ' + err);
	          } else { // else console.log that we did well and then redirect to the root route
	            console.log('successfully removed  a user - ' + request.params.user_id);
	            response.redirect('/');
	          }
	    });
	},

	update: function(request, response) {
		console.log("inside post /users/update/:id " + request.params.user_id);
	    // Update person object 

	    User.update({"_id": request.params.user_id}, 
				      	{db_user_name: request.params.user_name, 
				      	db_user_email: request.params.user_email, 
				      	db_user_birthday: request.params.user_birthday, 
				      	db_user_picture_url: request.params.user_picture_url, 
				      	db_user_gender: request.params.user_gender, 
				      	db_user_facebook_userid: request.params.user_facebook_userid, 
				      	db_user_created_date: new Date()}, {multi: false}, function (err){
				          if(err) {
				            console.log('Error: ' + err);
				          } else { // else console.log that we did well and then redirect to the root route
				            console.log('successfully updated user - ' + request.params.user_name);
				            response.redirect('/');
	   	            	  }

	    });
	},

}