// The user controller - ued for creating a user

angular.module('userController', ['userServices'])

.controller('regCtrl', function($http, $location, User) {

	var app = this;

	this.regUser = function(regData) {
		app.loading = true;
		app.errorMsg = false;
		console.log('form submitted');
		
		User.create(app.regData).then(function(data) {
			if (data.data.success) {
				app.loading = false;
				app.successMsg = data.data.message;
				$location.path('/');
			} else {
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
});