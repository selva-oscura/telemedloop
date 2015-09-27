// sinchCall = {
// 	sinchClient: function(){
// 		var sinchClient = new SinchClient({
// 			applicationKey: 'ee26a540-70e4-430a-aa7b-385966cbdcec',
// 			capabilities: {calling: true, video: true},
// 			supportActiveConnection: true,
// 			onLogMessage: function(message) {
// 				console.log(message);
// 			},
// 		});
// 		sinchClient.startActiveConnection();
// 		return sinchClient;
// 	}, callClient: function(){
// 		var callClient = sinchClient.getCallClient();
// 		callClient.initStream().then(function(){
// 		    console.log("Call Stream inited");
// 		});
// 		callClient.addEventListener({
// 		  onIncomingCall: function(incomingCall) {
// 		  	$('audio#ringtone').prop("currentTime", 0);
// 			$('audio#ringtone').trigger("play");

// 			//Print statistics
// 			$('div#callLog').append('<div id="title">Incoming call from ' + incomingCall.fromId + '</div>');
// 			$('div#callLog').append('<div id="stats">Ringing...</div>');

// 		  	call = incomingCall;
// 		  	call.addEventListener(callListeners);
// 		  }
// 		});
// 		return callClient;
// 	}, call: function(){
// 		var call;
// 		return call;
// 	}, callListeners: {
// 		  onCallProgressing: function(call) {
// 		    $('audio#ringback').prop("currentTime", 0);
// 			$('audio#ringback').trigger("play");
// 				//Report call stats
// 			$('div#callLog').append('<div id="stats">Ringing...</div>');  
// 		  },
// 		  onCallEstablished: function(call) {
// 		  	$('video#outgoing').attr('src', call.outgoingStreamURL);
// 			$('video#incoming').attr('src', call.incomingStreamURL);
		    
// 		    $('audio#incoming').attr('src', call.incomingStreamURL);
// 			$('audio#ringback').trigger("pause");
// 			$('audio#ringtone').trigger("pause");

// 			//Report call stats
// 			var callDetails = call.getDetails();
// 			$('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime)+'</div>'); 
// 		  },
// 		  onCallEnded: function(call) {
// 		    $('audio#ringback').trigger("pause");
// 			$('audio#ringtone').trigger("pause");
// 			$('audio#incoming').attr('src', '');

// 			$('video#outgoing').attr('src', '');
// 			$('video#incoming').attr('src', '');

// 			var callDetails = call.getDetails();
// 			$('div#callLog').append('<div id="stats">Ended: '+callDetails.endedTime+'</div>');
// 			$('div#callLog').append('<div id="stats">Duration (s): '+callDetails.duration+'</div>');
// 			$('div#callLog').append('<div id="stats">End cause: '+call.getEndCause()+'</div>');
// 			if(call.error) {
// 				$('div#callLog').append('<div id="stats">Failure message: '+call.error.message+'</div>');
// 		}
// 	  }
// 	}
// }


var sinchClient = new SinchClient({
	applicationKey: 'ee26a540-70e4-430a-aa7b-385966cbdcec',
	capabilities: {calling: true, video: true},
	supportActiveConnection: true,

	onLogMessage: function(message) {
		console.log(message);
	},
});

sinchClient.startActiveConnection();

var callClient = sinchClient.getCallClient();
callClient.initStream().then(function(){
    console.log("Call Stream inited");
});

var call;

callClient.addEventListener({
  onIncomingCall: function(incomingCall) {
  	$('audio#ringtone').prop("currentTime", 0);
	$('audio#ringtone').trigger("play");

	//Print statistics
	$('div#callLog').append('<div id="title">Incoming call from ' + incomingCall.fromId + '</div>');
	$('div#callLog').append('<div id="stats">Ringing...</div>');

  	call = incomingCall;
  	call.addEventListener(callListeners);
  }
});


var callListeners = {
  onCallProgressing: function(call) {
    $('audio#ringback').prop("currentTime", 0);
	$('audio#ringback').trigger("play");
		//Report call stats
	$('div#callLog').append('<div id="stats">Ringing...</div>');  
  },

  onCallEstablished: function(call) {
  	$('video#outgoing').attr('src', call.outgoingStreamURL);
	$('video#incoming').attr('src', call.incomingStreamURL);
    
    $('audio#incoming').attr('src', call.incomingStreamURL);
	$('audio#ringback').trigger("pause");
	$('audio#ringtone').trigger("pause");

	//Report call stats
	var callDetails = call.getDetails();
	$('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime)+'</div>'); 
  },

  onCallEnded: function(call) {
    $('audio#ringback').trigger("pause");
	$('audio#ringtone').trigger("pause");
	$('audio#incoming').attr('src', '');

	$('video#outgoing').attr('src', '');
	$('video#incoming').attr('src', '');

	var callDetails = call.getDetails();
	$('div#callLog').append('<div id="stats">Ended: '+callDetails.endedTime+'</div>');
	$('div#callLog').append('<div id="stats">Duration (s): '+callDetails.duration+'</div>');
	$('div#callLog').append('<div id="stats">End cause: '+call.getEndCause()+'</div>');
	if(call.error) {
		$('div#callLog').append('<div id="stats">Failure message: '+call.error.message+'</div>');
	}
  }
};

Template.home.helpers({
	roleUnspecified: function(){
		var user = Meteor.user();
		if(user){
			console.log(user);
			console.log(user.profile);
			if(user.profile){
				if(user.profile.role){
					var userObj = {
						username: user.emails[0].address,
						password: user._id
					}
					console.log(userObj);
					sinchClient.start(userObj, function(){
					  console.log("User logged in");
					}).fail(function(){
					  alert("Error credential, sign in again");
					});
					return false;
				}
			}
			var userObj = {
				username: user.emails[0].address,
				password: user._id
			}
			console.log(userObj);
			sinchClient.newUser(userObj, function(){
				console.log("New user created to Sinch");
			}).fail(function(){
				alert("Failed to create user to Sinch");
			});
			return true;
		}
	}
});

Template.home.events({
	'submit #role': function(e){
		e.preventDefault();
		var userId = Meteor.userId();
		var role = $(e.target).find('[name=role]:checked').val();
		console.log('role',role);
		Meteor.users.update(userId, {$set: {profile: {role:role}}});
	},
	'change form': function(e){
		$('#role').submit();
	}
});

