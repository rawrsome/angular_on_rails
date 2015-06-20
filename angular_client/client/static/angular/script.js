var App = angular.module('myApp', ['ngRoute']);
// ====> overcoming cross orgin error
	App.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);
// <==== end


// ====> start partials
	App.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'partials/products.html'
		})
		.when('/members', {
			templateUrl: 'partials/members.html'
		})	
		.when('/register', {
			templateUrl: 'partials/register.html'
		})	
		.when('/about', {
			templateUrl: 'partials/about.html'
		})
		.when('/show/:id', {
			templateUrl: 'partials/show.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
// <==== end partials


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
							// productsController
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

	App.controller('productsController', function($scope, ProductFactory, $location) {
		ProductFactory.getProducts(function(data) {
			console.log('===> getProducts <=== productsController', data);
			$scope.products = data.products;
			console.log(data);
		})
	});


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
							// ProductFactory
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
	
	App.factory('ProductFactory', function($http) {
		var factory = {};
		var products = [];

	// ====> getProducts
		factory.getProducts = function(callback) {
			console.log('===> getProducts <=== ProductFactory', callback);
			$http.get('/products').success(function(results) {
				callback(results);
			});
		}
	// <==== end getProducts



	// ====> showProduct
		factory.showProduct = function(callback) {
			console.log('===> showProduct <=== ProductFactory', callback);
			$http.get('/products/:id').success(function(results) {
				console.log(results);
				callback(results);
			});
		}
	// <==== end showProduct
	return factory;
	});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
							// registersController
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //

	App.controller('registersController', function($scope, UserFactory) {
	// ====> start register
		$scope.addUser = function() {
			console.log('---> addUser <--- usersController' + $scope);
			UserFactory.addUser($scope.new_user, function(users) {
				$scope.users = users;
			});
			$scope.new_user = {};
		}
	// <==== end register
	});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
							// usersController
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //

	App.controller('usersController', function($scope, UserFactory) {
	// ====> display all users
		console.log('---> show all users <--- usersController');
		$scope.users = UserFactory.getUsers(function(res) {
			$scope.users = res;
			console.log($scope.users);
		})
	// <==== end display all users
	});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
							// UserFactory
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //

	App.factory('UserFactory', function($http) {
		var factory = {};
		var users = [];
	// ====> getUsers
		factory.getUsers = function(callback) {
			console.log('===> getUsers <=== UserFactory', callback);
			$http.get('http://localhost:3000/users').success(function(res) {
				users = res;
				// console.log(users);
				callback(users);
			})
		}
	// <==== end getUsers



	// ====> start register
		factory.addUser = function(new_user, callback) {
			console.log('===> addUser <=== UserFactory', callback);
			$http({
				method: 'POST',
				url: 'http://localhost:3000/users',
				params: new_user,
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).success(function(res) {
				users = res;
				callback(users);
			})
			console.log(new_user);
		}
	// <==== end register
	return factory;
	});
