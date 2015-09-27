Template.contacts.events({
	"click .start-video" : function(event) {
	    event.preventDefault();
	    console.log('clicked');
	    Session.set('showVideo', true);
	    var callee = this.contactEmail;
	    console.log(callee);
	    call = callClient.callUser(callee);
	    call.addEventListener(callListeners);
	}
});


//helpers
Template.contacts.helpers({
	people: function(){
		var contactList = []
		var contact1 = {
			contactId: "mmu2mPS9inDHCe6Dj",
			contactName: "TeleMediLoop -- Emergency",
			contactEmail: "nurse@telemediloop.com"
		}
		var contact2 = {
			contactId: "mmu2mPS9inDHCe6Dj",
			contactName: "TeleMediLoop -- Appointments",
			contactEmail: "nurse@telemediloop.com"
		}
		contactList.push(contact1);
		contactList.push(contact2);
		console.log('contactList',contactList);
		return contactList;
		// if(userId){
		// 	if(Contacts.find({contactListOwner: user._id}).count()===0 && user.profile.role==="client"){
		// 		var contact1 = {
		// 			contactListOwner: user._id,
		// 			contactId: "mmu2mPS9inDHCe6Dj",
		// 			contactName: "TeleMediLoop -- Emergency",
		// 			contactEmail: "nurse@telemediloop.com"
		// 		}
		// 		var contact2 = {
		// 			contactListOwner: user._id,
		// 			contactId: "mmu2mPS9inDHCe6Dj",
		// 			contactName: "TeleMediLoop -- Appointments",
		// 			contactEmail: "nurse@telemediloop.com"
		// 		}
		// 		Contacts.insert(contact1);
		// 		Contacts.insert(contact2);
		// 	}
		// 	return Contacts.find({contactListOwner:userId});
		// }
	}

	//, createContact: function(contactAttributes){
	// 	var userId = Meteor.userId();
	// 	var contact = {
	// 		contactListOwner: userId,
	// 		contactId: contactAttributes._id,
	// 		contactName: contactAttributes.name,
	// 		contactEmail: contactAttributes.email
	// 	}
	// 	var contactId = Contacts.insert(contact);
	// 	return {_id:contactId}
	// }
});
