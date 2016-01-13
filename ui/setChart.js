/**
 * 数据可视化图表
 */

(function(root, factory) {
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
    }(this, function(angular) {
        'use strict';

        var m = angular.module('DataChart', []);

        var $el = angular.element;

        m.provider('dataChart', function () {
            var default_circle = this.default_circle = {
              parent: null,
              init:{
                datasets:[{
                  data: {value: 1}
                }]
              },
              options: null
            };

            var default_thread = this.default_thread = {
              parent: null,
              init:{
                labels:[],
                datasets:[{
                  fillColor : "rgba(220,220,220,0.2)", //面积填充
                  strokeColor : "rgba(220,220,220,1)", //轨迹
                  pointColor : "rgba(220,220,220,1)",//点填充
                  pointStrokeColor : "#fff", //点静止外环
                  pointHighlightFill : "#fff", //获焦填充
                  pointHighlightStroke : "rgba(220,220,220,1)",
                  data: [randomScalingFactor()]
                }]
              },
              options: null
            };

           	this.$get = ['$document','$templateCache','$compile','$q','$http','$rootScope','$timeout','$window','$controller','error',
           	function($document,$templateCache,$compile,$q,$http,$rootScope,$timeout,$window,$controller,error) {

              var Module = {}; //设置图表模式

              this.module = "";



           		var Chart = function() {
           		};

           		Chart.instances = {};
           		Chart.prototype = {
                
                
                // 构建
           			create: function(opts) {
           			
                  return this;
           			},

                setModuel: function(type) {
                  
                }

           		};

              var privateMethods = {
                // 初始化 环形图，饼图，极地区图
                createCircleOption: function(opts) {
                    var options = angular.copy(default_circle);
                    opts = opts  || {};
                    angular.extend(options, opts);
                    return options;
                },

                 // 初始化  折线图，雷达图，柱状图
                createThreadOption: function(opts) {
                    var options = angular.copy(default_thread);
                    opts = opts  || {};
                    angular.extend(options, opts);
                    return options;
                }
              }
              

           		var publicMethods = {
                // 线形图
                line:function(opts) {
                  privateMethods.createCircleOption(opts[""])
                  var lines = new Chart().create();

                },
                // 雷达图
                radar:function(opts) {
                  
                },
                // 柱状图
                bar:function(opts) {
                  
                },
                // 环形图
                doughunt:function(opts) {
                  
                },
                // 饼图
                pie:function(opts) {
                  
                },
                // 极地区图
                polararea:function(opts) {
                  
                }
                
           		};
           		
           		return publicMethods;
           	}];
           


        });
	
	return m;

	}));
