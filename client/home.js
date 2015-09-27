Template.home.helpers({
	roleUnspecified: function(){
		var user = Meteor.user();
		if(user){
			console.log(user);
			console.log(user.profile);
			if(user.profile){
				if(user.profile.role){
					return false;
				}
			}
		}
		return true;
	}
});

Template.home.events({
	'submit #role': function(e){
		e.preventDefault();
		var userId = Meteor.userId();
		var role = $(e.target).find('[name=role]:checked').val();
		console.log('role',role);
		Meteor.users.update(userId, {$set: {profile: {role:role}}});
	},
	'change form': function(e){
		$('#role').submit();
	}
});
