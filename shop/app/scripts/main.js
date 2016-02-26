'use strict';

require('./request');

var app = angular.module('adminApp', ['ui.router','BatDialog','Request','ListModule','UI', 'UIService']);






app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/list');
    $stateProvider
        .state('admin', {
            url: '/admin',
            views: {
                '': { templateUrl: 'views/admin.html' }
            }
        })
        .state('list', {
            url: '/list',
            views: {
                '': { templateUrl: 'views/list.html' }
            }
        })
       ;
});


require('./services/ui.js');
require('./services/uiService.js');
require('./services/dialog.js');
require('./services/list.js');