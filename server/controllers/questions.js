var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

module.exports = {
	getAll: function(request, response) {
	  console.log("inside get /");

	  Question.find({}).populate('answers').exec(function(err, questions){
	        response.json({questions: questions});
	  })

	},

	getOne: function(request, response) {
	  	console.log("inside getOne /" + request.params.id);

		//Question.find({"_id": request.params.id}, function(err, questions) {
		Question.find({"_id": request.params.id}).populate('answers').exec(function(err, questions) {

		      if(err) {
		        console.log('Error: ' + err);
		      } else {
		      	var question; // else console.log that we did well and then redirect to the root route
		        for (var i = 0; i < questions.length; i++) {
		          question = questions[i];
		          break;
		        };
		        response.json({question: question});
		      }
		});
	},

	createQuestion: function(request, response) {
	    // data from form on the front end
        console.log(request.body.user + "::" + request.body.text + "::" + request.body.description + "::");

	    if(request.body.user == undefined || request.body.user.length < 4)
	    {
          response.json({title: 'you have errors!', error: 'user name cannot be less than 4 chars!'});
	      // Question.find({}).populate('answers').exec(function(err, questions){
	      //        //console.log("Questions=" + questions);  
	      //        response.json({questions: questions, title: 'you have errors!', error: 'user name cannot be less than 4 chars!'});
	      //        return;
	      //   })

	    }
	    else {
		    // var question = new Question();
		    // question.user = request.body.user;
		    // question.text = request.body.text;
		    // question.description = request.body.description;
		    // var answer = new Answer(request.body);
		    // //  set the reference like this:
		    // answer._question = question._id;
		    // question.answers.push(answer);
		    // // now save both to the DB
		    // answer.save(function(err){
		    //     question.save(function(err){
		    //       if(err) {
		    //         console.log('Error');
		    //       } else {
		    //         response.redirect('/');
		    //       }
		    //     });
		    // });

		    var question = new Question();
		    question.user = request.body.user;
		    question.text = request.body.text;
		    question.description = request.body.description;
		    // var answer = new Answer(request.body);
		    // //  set the reference like this:
		    // answer._question = question._id;
		    // question.answers.push(answer);
		    // // now save both to the DB
		    // answer.save(function(err){
		        question.save(function(err){
		          if(err) {
		            console.log('Error');
		          } else {
		            response.redirect('/');
		          }
		        });
		    //});
		}
	 },

	createAnswer: function(request, response) {
	    // data from form on the front end
	    console.log("qid=" + request.body.qid + " AnswerBy:" + request.body.user + " Answer:" + request.body.text + "   desc:" + request.body.description);
	    Question.findOne({"_id": request.body.qid}, function(err, question){
	        if(err)            
	        {
	          console.log("Error occured: " + err);
	        }

	        // data from form on the front end
	        var answer = new Answer(request.body);
	        answer.text = request.body.text;
	        answer.name = request.body.user;
	        answer.description = request.body.description;

	        //  set the reference like this:
	        answer._question = request.body.qid;
	        question.answers.push(answer);
	        // now save both to the DB
	        answer.save(function(err){
	            question.save(function(err){
	              if(err) {
	                         console.log('Error');
	              }
	              else
	              {
		           	 console.log('successfully added a answer - ');
	                 response.redirect('/');
	              }
	            });
	        });
	      })
	}
}