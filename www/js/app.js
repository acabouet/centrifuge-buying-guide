// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('centrifugeApp', ['ionic', 'centrifugeApp.controllers', 'centrifugeApp.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('welcome', {
				url: '/',
				views: {
					welcome: {
						templateUrl: 'templates/welcome.html'
					}
				}
			})

			// route to show our basic form (/form)
			.state('form', {
				abstract: true,
				url: '/form',
				views: {
					form: {
						templateUrl: 'templates/form.html',
						controller: 'formController'
					}
				}
			})

			.state('form.index', {
				url: '',
				template: '<div id="form-views" ui-view></div>'

			})


			.state('form.control', {
				url: '/control',
				templateUrl: 'templates/form-control.html'
			})

			.state('form.speed', {
				url: '/speed',
				templateUrl: 'templates/form-speed.html'
			})

			.state('form.tubes', {
				url: '/tubes',
				templateUrl: 'templates/form-tubes.html'
			})

			// url will be /form/payment
			.state('form.options', {
				url: '/options',
				templateUrl: 'templates/form-options.html'
			})

			.state('form.results', {
				url: '/results',
				templateUrl: 'templates/form-results.html'
			});

		// catch all route
		// send users to the form page
		$urlRouterProvider.otherwise('/');
	});

