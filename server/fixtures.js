// Appointments.remove({});
if(Appointments.find().count()===0){
	var j = 0;
	for(var i = 8; i<16; i++){
		var clients = ["Bob Jones", "Greg Lewes", "Alice Hopper", "Marion Davies", "Carol St. Louis", "Erica Harvey", "Charles Yan"]
		var emails = ["bj", "gl", "ah", "md", "stlouis_c@yahoo.com", "eh", "charlieyansf@yahoo.com"];
		var reasons = ["follow up re: congestive heart failure", "allergy complaint", "light-headedness", "family consult re: mother, Evelyn Davies", "general check-up", "follow-up re: recent ER visit for food poisoning", "general check-up"];
		idNum = Math.floor(Math.random()*80000)+100000
		var appointment = {
			appointmentListOwner: 'mmu2mPS9inDHCe6Dj',
			timeslot: i,
			clientCaseNumber: idNum,
			clientName: clients[j],
			clientEmail: emails[j],
			appointmentReason: reasons[j]
		}
		j++;
		var appointmentId = Appointments.insert(appointment);
		console.log(appointmentId);
	}
}

