Router.configure({
  layoutTemplate: 'layout', 
  loadingTemplate: 'loading'
});

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


//Account Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');


Meteor.startup(function(){
  Router.onBeforeAction (function() {
          AccountsTemplates.ensureSignedIn.call(this);
          AccountsTemplates.clearError();
  }, {
    except: AccountsTemplates.knownRoutes
  });
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

Router.onBeforeAction(function () {
    if (Meteor.user() ) {
        this.redirect('/home');
    } else {
        // required by Iron to process the route handler
        this.next();
    }
}, {
    only: ['index']
});


// catchall route
Router.route('/(.*)', function () {
    this.redirect('/home');
});
