/**
 * 数据可视化图表
 */

(function (root, factory) {
        if (typeof module !== 'undefined' && module.exports) {
            // CommonJS
            module.exports = factory(require('angular'));
        } else if (typeof define === 'function' && define.amd) {
            // AMD
            define(['angular'], factory);
        } else {
            // Global Variables
            factory(root.angular);
        }
    }(this, function (angular) {
        'use strict';

        var m = angular.module('DataChart', []);

        var $el = angular.element;

        m.provider('dataChart', function () {
            var defaults = this.defaults = {
            	parent: null,
            	width: 400,
            	height: 500,
            	margin: {left: 30,top: 30, right: 30, bottom: 30},
            	data: null
            };

           	this.$get = ['$document','$templateCache','$compile','$q','$http','$rootScope','$timeout','$window','$controller',
           	function($document,$templateCache,$compile,$q,$http,$rootScope,$timeout,$window,$controller) {
           		var Chart = function() {
           		};

           		Chart.instances = {};
           		Chart.prototype = {
           			create: function(opts) {
           				
           			},

           			setSize: function(size) {
           				
           			},

           			translate: function(left,top) {
                    
                },



           		};

           		var privateMethods = {
           			// 数据初始化
           			createOption: function(opts) {
           				var options = angular.copy(defaults);
           				opts = opts  || {};
           				angular.extend(options, opts);
           				return options;
           			}
           		};

           		var publicMethods = {
                line:function(opts) {
                   
                }
           		};
           		
           	}];
           


        });

	})
);
