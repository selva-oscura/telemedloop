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




Template.voiceCall.events({

  // "click #signUp" : function(event) {

  //   var userObj = {
  //     username : $("#username").val(), 
  //     password : $("#password").val()
  //   };

  //   sinchClient.newUser(userObj, function(){
  //   	console.log("New user created to Sinch");
  //   }).fail(function(){
  //   	alert("Failed to create user to Sinch");
  //   });
  // },

  // "click #signIn" : function(event) {
  //   event.preventDefault();

  //   var userObj = {
  //     username : $("#username").val(), 
  //     password : $("#password").val()
  //   };

  //   sinchClient.start(userObj, function(){
  //     console.log("User logged in");
  //   }).fail(function(){
  //     alert("Error credential, sign in again");
  //   });
    
  // },

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
