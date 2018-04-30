// The app js file - used to link all the controllers to the service

//console.log('Testing main app configuration');
angular.module('userApp', ['appRoutes', 'userController', 'userServices', 'mainController', 'authServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});