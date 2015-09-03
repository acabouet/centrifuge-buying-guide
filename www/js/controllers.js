angular.module('centrifugeApp.controllers', [])

	.controller('formController', function($scope, $http, $state) {

		// we will store all of our form data in this object
		$scope.formData = {};
		$scope.centrifugesJSON = {};
		$scope.centrifuges = {};

		$scope.reloadRoute = function() {
			$scope.formData = {};
			$state.go('welcome');
		};

		function processJSON(centrifugeJSON) {

			function getCentrifuge(nids) {


				nids = nids.replace(/,+$/, "");

				// Load a node helper function.
				function loadNodes(nids) {
					var nodeUrl = 'http://labnetinternational.com/api/anonymous/views/centrifuge_json.json?';
					var nodeRequest = nodeUrl + nids;
					var node = {};

					$http.get(nodeRequest).success(function(data, status, headers, config) {
						node.data = data;
						node.status = status;

					}).error(function(data, status, headers, config) {
						node.data = data;
						node.status = status;
					});

					return node;

				}

				return loadNodes(nids);
			}


			if(typeof centrifugeJSON === 'object'){
				console.log(centrifugeJSON);
				var nids = 'args[0]=';
				for (var i= 0, len = centrifugeJSON.length; i < len; i++) {
					if(centrifugeJSON[i].field_product_reference.length != 0){
						var nodeID = centrifugeJSON[i].field_product_reference.und[0].nid;
						console.log(nodeID);
						nids += nodeID + ',';
					}
				}

				return getCentrifuge(nids);

			} else {
				return centrifugeJSON;
			}
		}



		// function to process the form
		$scope.processForm = function() {
			var query = $scope.formData;
			var url = 'http://labnetinternational.com/api/anonymous/views/centrifuge_buying_options_json.json?';
			var params = jQuery.param(query);
			var request = url + params;

			$http.get(request).success(function(data, status, headers, config) {
				$scope.centrifuges.centrifuge = processJSON(data);
				$scope.centrifuges.status = status;



			}).error(function(data, status, headers, config) {
				$scope.centrifugesJSON.data = data;
				$scope.centrifugesJSON.status = status;
			});


			$state.go('form.results');

		};




	})


	.controller('rotorField', function($scope, $http) {
		$scope.rotorOptions = {};
		$http({
			url: 'http://labnetinternational.com/api/anonymous/vocabulary/getTree.json',
			method: "POST",
			data: 'vid=9',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data, status, headers, config) {
			$scope.rotorOptions = data;
		}).error(function (data, status, headers, config) {
			$scope.status = status;
		});

		return $scope.rotorOptions;

	})

	.controller('tubeSizes', function($scope, $http) {
		$scope.tubeSizes = {};
		$http({
			url: 'http://labnetinternational.com/api/anonymous/vocabulary/getTree.json',
			method: "POST",
			data: 'vid=10',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function (data, status, headers, config) {
			$scope.tubeSizes = data;

		}).error(function (data, status, headers, config) {
			$scope.status = status;
		});


	});
