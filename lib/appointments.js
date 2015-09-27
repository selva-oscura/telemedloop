Appointments = new Mongo.Collection('appointments');

Meteor.methods({
	createAppointment: function(attributes){
		var userId = Meteor.userId();
		var appointment = {
			appointmentListOwner: userId,
			timeslot: attributes.timeslot,
			clientCaseNumber: attributes._id,
			clientName: attributes.name,
			clientEmail: attributes.email,
			appointmentReason: attributes.reason
		}
		var appointmentId = Appointments.insert(appointment);
		return {_id:appointmentId}
	}
});