Template.videoSpace.events({
	'click .terminate-call': function(){
		Session.set('showVideo', false);
	}
});