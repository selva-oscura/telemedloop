Contacts = new Mongo.Collection('contacts');

Meteor.methods({
	createContact: function(contactAttributes){
		var userId = Meteor.userId();
		var contact = {
			contactListOwner: userId,
			contactId: contactAttributes._id,
			contactName: contactAttributes.name,
			contactEmail: contactAttributes.email
		}
		var contactId = Contacts.insert(contact);
		return {_id:contactId}
	}
});