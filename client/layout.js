// events
Template.header.helpers({
 	activeRouteClass: function(/* route names */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.getName() === name
		});
		return active && 'active';
  	}
});


// events
Template.footer.helpers({
 	activeRouteClass: function(/* route names */) {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.getName() === name
		});
		return active && 'activeroute';
  	}
});


var  sinchClient = new SinchClient({
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


Template.voiceCall.events({

  "click #signUp" : function(event) {

    var userObj = {
      username : $("#username").val(), 
      password : $("#password").val()
    };

    sinchClient.newUser(userObj, function(){
    	console.log("New user created to Sinch");
    }).fail(function(){
    	alert("Failed to create user to Sinch");
    });
  },

  "click #signIn" : function(event) {
    event.preventDefault();

    var userObj = {
      username : $("#username").val(), 
      password : $("#password").val()
    };

    sinchClient.start(userObj, function(){
      console.log("User logged in");
    }).fail(function(){
      alert("Error credential, sign in again");
    });
    
  },

  "click #voiceCall" : function(event) {
    event.preventDefault();
    var callee = $("#contacts").val();
    $('div#callLog').append('<div id="title">Calling ' + callee +'</div>');
    call = callClient.callUser(callee);
    call.addEventListener(callListeners);
  },

  "click #hangup" : function(event) {
    console.log("hangup call");
    call.hangup();
  },

  "click #answer" : function(event) {
  	console.log("answering call");
  	call.answer();
  }

});
