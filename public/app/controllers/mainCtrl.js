// Main controller for the user and app services - lets the user login and logout of the application

angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $location) {
	
	var app = this;

	if (Auth.isLoggenIn()) {
		console.log('Success: User is logged in');
		Auth.getUser().then(function(data) {
			console.log(data);
		});
	} else {
		console.log('Failure: User not logged in');
	}

	this.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;
		console.log('form submitted');
		
		Auth.login(app.loginData).then(function(data) {
			if (data.data.success) {
				app.loading = false;
				app.successMsg = data.data.message;
				$location.path('/about');
			} else {
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};

	this.logout = function() {
		Auth.logout();
		$location.path('/logout');
	};

});