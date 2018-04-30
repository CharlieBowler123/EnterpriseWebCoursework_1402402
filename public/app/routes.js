// The routes js file - used to route the application together

//console.log('Testing main routes configuration');
angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	})

	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html'
	})

	.when('/chat', {
		templateUrl: 'app/views/pages/users/chat.php'
	})

	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requiredBase: false
	});
	
});