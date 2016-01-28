'use strict';

var ui = angular.module('UI', []);

ui.directive('icon', [function () {
	return {
		scope: {},
		restrict: 'AE',
		template: '<img></img>',
		controller:function($scope) {
			$scope.abilities = [];
			this.setSize = function() {
				$scope.abilities.push('strength');
			};
			this.addSpeed = function() {
				$scope.abilities.push('speed');
			};
			this.addLight = function() {
				$scope.abilities.push('light');
			};
		},
		link: function (scope, element, attrs) {
			element.addClass('btn btn-primary');
			element.bind('mouseenter',function() {
				console.log(scope.abilities);
			});
		}
	};
}]);

ui.directive('size', [function () {
	return {
		require: "^icon",   //
		link: function (scope, element, attrs,supermanCtr) {
			supermanCtr.addStrength();		
		}
	};
}]);

