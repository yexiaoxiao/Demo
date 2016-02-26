'use strict';

var listModule = angular.module("ListModule", []);

listModule.controller("listMessageCtrl", function ($scope, $http, $state, $stateParams, request) {

    request.messageList('',function(res) {
        $scope.infoList = res; 
    });

});

