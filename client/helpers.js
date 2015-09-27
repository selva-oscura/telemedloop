UI.registerHelper("roleCheck", function(role) {
	var user = Meteor.user();
	if(user){
		// console.log('checking role', user.profile.role, 'is', role, user.profile.role === role);
		if(user.profile.role === role){
			return true;
		}
	}
    return false;
});


UI.registerHelper("showVideo", function(){
	var showVideo = Session.get('showVideo');
	console.log('showVideo', showVideo);
	if(showVideo === undefined){
		return false
	}
	return showVideo;
});