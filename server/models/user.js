var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    db_user_id: String,
    db_user_name: String,
    db_user_email: String,
    db_user_birthday: String,
    db_user_picture_url: String,
    db_user_gender: String,
    db_user_facebook_userid: String,
    db_user_is_endorser: String,
    db_user_friends: [{type: Schema.Types.ObjectId, ref: 'Friend'}],
    db_user_endorsements: [{type: Schema.Types.ObjectId, ref: 'Endorsement'}],
    db_user_created_date: Date 
});

var friendSchema = new mongoose.Schema({
    _user: {type: Schema.ObjectId, ref: 'User'},
    db_friend_name: String,
    db_friend_email: String,
    db_friend_birthday: String,
    db_friend_picture_url: String,
    db_friend_gender: String,
    db_friend_birthday: String,
    db_friend_facebook_userid: String,
    db_friend_created_date: Date
});
var Schema = mongoose.Schema;

var endorsementSchema = new mongoose.Schema({
    //db_user_id: String,
    _user: {type: Schema.ObjectId, ref: 'User'},		// id of the endorsing user
    db_endorsement_category: String,
    db_endorsement_comment: String,
    db_endorsement_created_date: Date 
});


var User = mongoose.model('User', userSchema);
var Friend = mongoose.model('Friend', friendSchema);
var Endorsement = mongoose.model('Endorsement', userSchema);
