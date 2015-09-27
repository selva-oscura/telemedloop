//helpers
Template.contacts.helpers({
	contacts: function(){
		var userId = Meteor.userId();
		if(userId){
			if(Contacts.find({contactListOwner: user._id}).count()===0 && user.profile.role==="client"){
				var contact1 = {
					contactListOwner: user._id,
					contactId: "mmu2mPS9inDHCe6Dj",
					contactName: "TeleMediLoop -- Emergency",
					contactEmail: "nurse@telemediloop.com"
				}
				var contact2 = {
					contactListOwner: user._id,
					contactId: "mmu2mPS9inDHCe6Dj",
					contactName: "TeleMediLoop -- Appointments",
					contactEmail: "nurse@telemediloop.com"
				}
				Contacts.insert(contact1);
				Contacts.insert(contact2);
			}
			return Contacts.find({contactListOwner:userId});
		}
	}
});
