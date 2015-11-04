var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
	// getAll: function(request, response) {
	// 	  console.log("inside get /" );
	// 	  User.find({}).populate('db_user_friends').exec(function(err, users) {
	// 	    if(err)
	// 	    {
	// 	        response.json({message: "Error occured during database.find():db_db_" + err});    
	// 	    }
	// 	    else {
	// 	    	console.log(users.length);
	// 	        response.json({users: users});
	// 	    }
	// 	  })
	// },

	getFriends: function(request, response, users_data) {
		//console.log("inside getFriends /" + request.params.user_id);
	    var user = this.getUserFromList(request.params.user_id, users_data);
	    var friends = [];
  		for (var i = 0; i < user.db_user_friends.length; i++) {
  			var friend_name = user.db_user_friends[i].name;
  			//console.log("inside getFriends /" + friend_name);
  			var friend = this.getUserFromList(friend_name, users_data);
  			if(friend){
  				friends.push(friend);
  			}
  		}
    	response.json({friends: friends});
	},

	getOne: function(request, response, users_data) {
		// for (var i = 0; i < users_data.length; i++) {
		// 	if(users_data[i].db_user_id == request.params.user_id)
		// 	{
		// 		response.json({user: users_data[i]});
		// 	}
		// };
	    var user = this.getUserFromList(request.params.user_id, users_data);
	    if(user)
	    	response.json({user: user});
	},

	// notice that the function is app.get(...) why do you think the function is called get?
	create: function(request, response, users_data) {
	    console.log("inside post /users/:user_id " + request.body.user_id);
	    // Make User object 

      	var user = {
				      	db_user_id: request.body.user_id, 
				      	db_user_name: request.body.user_name, 
				      	db_user_email: request.body.user_email, 
				      	db_user_birthday: request.body.user_birthday, 
				      	db_user_picture_url: request.body.user_picture_url, 
				      	db_user_gender: request.body.user_gender, 
				      	db_user_facebook_userid: request.body.user_facebook_userid, 
				      	db_user_created_date: new Date(),
	      				db_user_friends: [],
						db_pending_endorsements: [],
						db_user_endorsements: [],
					};

		users_data.push(user);

        response.redirect('/');
	},

	// notice that the function is app.get(...) why do you think the function is called get?
	addFriend: function(request, response, users_data) {
	    console.log("inside addFriend : Adding " + request.body.friend_id + " to " + request.body.user_id);

		// for (var i = 0; i < users_data.length; i++) {
		// 	if(users_data[i].db_user_id == request.body.user_id)
		// 	{
		// 		users_data[i].db_user_friends.push({name: request.body.friend_id});
		// 		response.json({user: users_data[i]});	            
		// 	}
		// };

	    var user = this.getUserFromList(request.body.user_id, users_data);
	    if(user)
	    {
	    	user.db_user_friends.push({name: request.body.friend_id});
	    	response.json({user: user});
	    }
	},

	delete: function(request, response) {
		// console.log("inside post /users/:id/destroy " + request.params.user_id);
	 //    // Make user object 
	 //    User.remove({"db_user_id": request.params.user_id}, function (err){
	 //          if(err) {
	 //            console.log('Error: ' + err);
	 //          } else { // else console.log that we did well and then redirect to the root route
	 //            console.log('successfully removed  a user - ' + request.params.user_id);
	 //            response.redirect('/');
	 //          }
	 //    });
	},

	update: function(request, response) {
		console.log("inside post /users/update/:id " + request.body.user_id);
	    // Update person object 

	    // User.update({"db_user_id": request.body.user_id}, 
				 //      	{db_user_name: request.body.user_name, 
				 //      	db_user_email: request.body.user_email, 
				 //      	db_user_birthday: request.body.user_birthday, 
				 //      	db_user_picture_url: request.body.user_picture_url, 
				 //      	db_user_gender: request.body.user_gender, 
				 //      	db_user_facebook_userid: request.body.user_facebook_userid, 
				 //      	db_user_created_date: new Date()}, {multi: false}, function (err){
				 //          if(err) {
				 //            console.log('Error: ' + err);
				 //          } else { // else console.log that we did well and then redirect to the root route
				 //            console.log('successfully updated user - ' + request.body.user_name);
				 //            response.redirect('/');
	   	//             	  }

	    // });
	},

	// =============Endorsement code=======================
	// notice that the function is app.get(...) why do you think the function is called get?
	getUserFromList: function(user_id, users_data) {
		for (var i = 0; i < users_data.length; i++) {
			if(users_data[i].db_user_id == user_id)
			{
				return users_data[i];
			}
		};
		return undefined;
	},

	requestEndorsement: function(request, response, users_data) {
	    console.log("inside requestEndorsement : Adding " + request.body.requested_by + " to " + request.body.requested_for);

	    var user = this.getUserFromList(request.body.requested_for, users_data);
	    if(user)
	    	user.db_pending_endorsements.push({requested_by: request.body.requested_by});

		console.log("inside requestEndorsement : Returning " +  user);	    
    	response.json({user: user});
	},


	addEndorsement: function(request, response, users_data) {
	    console.log("inside addEndorsement : Adding endorsement for " + request.body.endorsed_for + " by " + request.body.endorsed_by);
	    console.log("Question: " + request.body.question + " answer: " + request.body.answer);
	    // Update person object 

	    var user = this.getUserFromList(request.body.endorsed_for, users_data);
	    if(user)
	    {
			console.log("Adding endorsements for " + request.body.endorsed_for);
			user.db_user_endorsements.push({endorsed_by: request.body.endorsed_by, endorsed_time: new Date(), question: request.body.question, answer: request.body.answer});

			// also remove the requester from pending queue
		    var current_user = this.getUserFromList(request.body.endorsed_by, users_data);
		    if(current_user)
		    {
				console.log(current_user.db_pending_endorsements.length);
				for (var j = 0; j < current_user.db_pending_endorsements.length; j++) {
					if(current_user.db_pending_endorsements[j].requested_by == request.body.endorsed_for)
					{
						console.log("Removing "+ request.body.endorsed_for + " from pending Q of " + request.body.endorsed_by);
						current_user.db_pending_endorsements.splice(j, 1);
						j--;
						//current_user.db_pending_endorsements[j] = '';
						//break;
					}	
				}
			}
	    }
    	response.json({user: user});
	},

}

// module.exports = {
// 	getAll: function(request, response) {
// 		  console.log("inside get /" );
// 		  User.find({}).populate('db_user_friends').exec(function(err, users) {
// 		    if(err)
// 		    {
// 		        response.json({message: "Error occured during database.find():db_db_" + err});    
// 		    }
// 		    else {
// 		    	console.log(users.length);
// 		        response.json({users: users});
// 		    }
// 		  })
// 	},

// 	getOne: function(request, response) {
// 	    console.log("inside get /users/:user_id " + request.params.user_id);

// 	  	User.find({"db_user_id": request.params.user_id}).populate('db_user_friends').exec(function(err, users) {
// 	          if(err) {
// 	            console.log('Error: ' + err);
// 	          } else { // else console.log that we did well and then redirect to the root route
// 	          	var user;
// 	          	console.log('users.length: ' + users.length);
// 	            for (var i = 0; i < users.length; i++) {
// 	              user = users[i];
// 	              break;
// 	            };
// 	            //response.json({user: user});

// 				response.json({user: user});	            
// 	          }
// 	    });
// 	},

// 	// notice that the function is app.get(...) why do you think the function is called get?
// 	create: function(request, response) {
// 	    console.log("inside post /users/:user_id " + request.body.user_id);
// 	    // Make User object 
// 	    User.find({"db_user_id": request.body.user_id}, function(err, users) {
// 	      if(users) {
// 		      console.log("===" + users.length);
// 		      var user = new User({
// 								      	db_user_id: request.body.user_id, 
// 								      	db_user_name: request.body.user_name, 
// 								      	db_user_email: request.body.user_email, 
// 								      	db_user_birthday: request.body.user_birthday, 
// 								      	db_user_picture_url: request.body.user_picture_url, 
// 								      	db_user_gender: request.body.user_gender, 
// 								      	db_user_facebook_userid: request.body.user_facebook_userid, 
// 								      	db_user_created_date: new Date()});

// 		      user.save(function(err) {
// 		      // if there is an error console.log that something went wrong!
// 		          if(err) {
// 		            console.log('Error: ' + err);
// 		          } else { // else console.log that we did well and then redirect to the root route
// 		            console.log('successfully added a user - ' + request.body.user_name);
// 		            response.redirect('/');
// 		          }
// 		      })
// 			}
// 	    });
// 	},

// 	delete: function(request, response) {
// 		console.log("inside post /users/:id/destroy " + request.params.user_id);
// 	    // Make user object 
// 	    User.remove({"db_user_id": request.params.user_id}, function (err){
// 	          if(err) {
// 	            console.log('Error: ' + err);
// 	          } else { // else console.log that we did well and then redirect to the root route
// 	            console.log('successfully removed  a user - ' + request.params.user_id);
// 	            response.redirect('/');
// 	          }
// 	    });
// 	},

// 	update: function(request, response) {
// 		console.log("inside post /users/update/:id " + request.body.user_id);
// 	    // Update person object 

// 	    User.update({"db_user_id": request.body.user_id}, 
// 				      	{db_user_name: request.body.user_name, 
// 				      	db_user_email: request.body.user_email, 
// 				      	db_user_birthday: request.body.user_birthday, 
// 				      	db_user_picture_url: request.body.user_picture_url, 
// 				      	db_user_gender: request.body.user_gender, 
// 				      	db_user_facebook_userid: request.body.user_facebook_userid, 
// 				      	db_user_created_date: new Date()}, {multi: false}, function (err){
// 				          if(err) {
// 				            console.log('Error: ' + err);
// 				          } else { // else console.log that we did well and then redirect to the root route
// 				            console.log('successfully updated user - ' + request.body.user_name);
// 				            response.redirect('/');
// 	   	            	  }

// 	    });
// 	},

// 	addEndorsement: function(request, response) {
// 		console.log("inside post /users/endorsements/new/:user_id " + request.body.user_id);
// 	    // Update person object 

// 	    User.findOne({"db_user_id": request.body.user_id}, function(err, user){
// 	        if(err) {
// 	          console.log("Error occured: " + err);
// 	        }
// 	        else {
// 		        // Read data from form on the front end
// 		        var end = new Endorsement(request.body);		
// 		        // end.db_endorsement_category = request.body.endorsement_category;
// 		        // end.db_endorsement_category = request.body.endorsement_category;
// 		        // end.text = request.body.endorsement_category;
// 		        // answer.name = request.body.endorsement_comment;

// 		        //  set the reference like this:
// 		        end._user = request.body.user_id;
// 		        user.db_user_endorsements.push(end);
// 		        // now save both to the DB
// 		        end.save(function(err){
// 		            user.save(function(err){
// 		              if(err) {
// 		              	console.log('Error');
// 		              }
// 		              else {
// 			           	 console.log('successfully added endorsement - ');
// 		                 response.redirect('/');
// 		              }
// 		            });
// 		        });
// 		    }
//         })
// 	},

// 	removeEndorsement: function(request, response) {
// 		var user_id = request.body.user_id;
// 		var end_id = request.body.endorsement_id;
// 		console.log("inside post /users/endorsements/new/:user_id " + user_id + "   Endorsement_id:" + end_id);
// 	    // Update person object 

// 	    User.findOne({"db_user_id": user_id}, function(err, user){
// 	        if(err) {
// 	          console.log("Error occured: " + err);
// 	        }
// 	        else {
// 			    Endorsement.findOne({"_id": end_id}, function(err, end){
// 		              if(err) {
// 		              	console.log('Error');
// 		              }
// 		              else {
// 					        // now save both to the DB
// 					        end.remove(function(err){
// 					            user.save(function(err){
// 					              if(err) {
// 					              	console.log('Error');
// 					              }
// 					              else {
// 						           	 console.log('successfully removed endorsement - ');
// 					                 response.redirect('/');
// 					              }
// 					            });
// 					        });
// 		              }
// 		        })
// 		    }
//         })
// 	},


// }
