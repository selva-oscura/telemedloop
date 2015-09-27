if(Appointments.find().count()===0){
	for(var i = 8; i<16; i++){
		idNum = Math.floor(Math.random()*80000)+100000
		var appointment = {
			appointmentListOwner: 'mmu2mPS9inDHCe6Dj',
			timeslot: i,
			clientCaseNumber: idNum,
			clientName: 'patient',
			clientEmail: 'email',
			appointmentReason: 'reason'
		}
		var appointmentId = Appointments.insert(appointment);
		console.log(appointmentId);
	}
}

