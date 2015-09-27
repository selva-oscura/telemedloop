// sinchClient = new SinchClient({
// 	applicationKey: 'ee26a540-70e4-430a-aa7b-385966cbdcec',
// 	capabilities: {calling: true, video: true},
// 	supportActiveConnection: true,

// 	onLogMessage: function(message) {
// 		console.log(message);
// 	},
// });

// sinchClient.startActiveConnection();

// callClient = sinchClient.getCallClient();
// callClient.initStream().then(function(){
//     console.log("Call Stream inited");
// });

// call;

// callClient.addEventListener({
//   onIncomingCall: function(incomingCall) {
//   	$('audio#ringtone').prop("currentTime", 0);
// 	$('audio#ringtone').trigger("play");

// 	//Print statistics
// 	$('div#callLog').append('<div id="title">Incoming call from ' + incomingCall.fromId + '</div>');
// 	$('div#callLog').append('<div id="stats">Ringing...</div>');

//   	call = incomingCall;
//   	call.addEventListener(callListeners);
//   }
// });


// callListeners = {
//   onCallProgressing: function(call) {
//     $('audio#ringback').prop("currentTime", 0);
// 	$('audio#ringback').trigger("play");
// 		//Report call stats
// 	$('div#callLog').append('<div id="stats">Ringing...</div>');  
//   },

//   onCallEstablished: function(call) {
//   	$('video#outgoing').attr('src', call.outgoingStreamURL);
// 	$('video#incoming').attr('src', call.incomingStreamURL);
    
//     $('audio#incoming').attr('src', call.incomingStreamURL);
// 	$('audio#ringback').trigger("pause");
// 	$('audio#ringtone').trigger("pause");

// 	//Report call stats
// 	var callDetails = call.getDetails();
// 	$('div#callLog').append('<div id="stats">Answered at: '+(callDetails.establishedTime)+'</div>'); 
//   },

//   onCallEnded: function(call) {
//     $('audio#ringback').trigger("pause");
// 	$('audio#ringtone').trigger("pause");
// 	$('audio#incoming').attr('src', '');

// 	$('video#outgoing').attr('src', '');
// 	$('video#incoming').attr('src', '');

// 	var callDetails = call.getDetails();
// 	$('div#callLog').append('<div id="stats">Ended: '+callDetails.endedTime+'</div>');
// 	$('div#callLog').append('<div id="stats">Duration (s): '+callDetails.duration+'</div>');
// 	$('div#callLog').append('<div id="stats">End cause: '+call.getEndCause()+'</div>');
// 	if(call.error) {
// 		$('div#callLog').append('<div id="stats">Failure message: '+call.error.message+'</div>');
// 	}
//   }
// };
