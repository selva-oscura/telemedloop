Template.appointments.helpers({
	appointments: function(){
		var appointments = Appointments.find();
		console.log(appointments);
		return Appointments.find();
	}
});

Template.appointments.events({
	"click .start-video" : function(event) {
	    event.preventDefault();
	    Session.set('showVideo', true);
	    var callee = this.clientEmail;
	    console.log(callee);
	    call = callClient.callUser(callee);
	    call.addEventListener(callListeners);
	}
});