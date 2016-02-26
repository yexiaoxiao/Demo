'use strict';


 require('./request');

 

var app = angular.module('userApp', ['ui.router','BatDialog','Request','SignModule','UI', 'UIService']);




app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/signIn');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': { templateUrl: 'themes/default.html' }
            }
        })
        .state('signIn', {
            url: '/signIn',
            views: {
                '': { templateUrl: 'themes/signIn.html' }
            }
        });
        
});


require('./services/ui.js');
require('./services/uiService.js');
require('./services/dialog.js');
require('./services/sign.js');