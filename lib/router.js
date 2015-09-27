Router.configure({
  layoutTemplate: 'layout', 
  loadingTemplate: 'loading'
});

// Router.route('/', {
//   name: 'index'
// });


Router.map(function() {
    this.route('index', {
        path: '/',
    });

    this.route('home', {
    	path: 'home'
    });

    this.route('contacts', {
    	path: 'contacts'
    });

    this.route('scheduler', {
    	path: 'scheduler'
    });

    this.route('settings', {
    	path: 'settings'
    });

    this.route('about', {
    	path: 'about_us'
    })

    this.route('contact', {
    	path: 'contact_us'
    })

});


Router.onBeforeAction(function () {
    if (!Meteor.user() && !Meteor.loggingIn()) {
        this.redirect('/');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    except: ['index']
});



// catchall route
Router.route('/(.*)', function () {
    this.redirect('/home');
});


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');