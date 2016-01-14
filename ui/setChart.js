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

          var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
          var colorList = ["#F7464A","#46BFBD","#FDB45C","#949FB1","#4D5360","#921AFF","#467500"];
          var highlightList = ["#FF5A5E","#5AD3D1","#FFC870","#A8B3C5","#616774","#BE77FF","#9AFF02"];



            var default_circle = this.default_circle = {
              parent: null,
              init:[{value:randomScalingFactor()}],
              options: {}
            };

            var default_thread = this.default_thread = {
              parent: null,
              init:{
                labels:[],
                datasets:[{
                  // fillColor : "rgba(220,220,220,0.2)", //面积填充
                  // strokeColor : "rgba(220,220,220,1)", //轨迹
                  // pointColor : "rgba(220,220,220,1)",//点填充
                  // pointStrokeColor : "#fff", //点静止外环
                  // pointHighlightFill : "#fff", //获焦填充
                  // pointHighlightStroke : "rgba(220,220,220,1)",
                  data: [randomScalingFactor()]
                }]
              },
              options: {}
            };

            this.$get = ['$document','$templateCache','$compile','$q','$http','$rootScope','$timeout','$window','$controller','error',
            function($document,$templateCache,$compile,$q,$http,$rootScope,$timeout,$window,$controller,error) {

             var Charts = function() {
              };

              Charts.instances = {};
              Charts.prototype = {
             // 构建
              create: function(parent) {
                this.ctx = $(parent).get(0).getContext("2d");
               return this;
               }
              };
              var privateMethods = {
                 // 初始化 环形图，饼图，极地区图
                 createCircleOption: function(opts) {
                     var options = angular.copy(default_circle);
                     opts = opts  || {};
                     angular.extend(options, opts);
                     if(options["init"]["color"] === undefined){
                        privateMethods.randomColor(options["init"],"color");
                        privateMethods.randomColor(options["init"],"highlight");
                     }
                     
                     return options;
                 },

                  // 初始化  折线图，雷达图，柱状图
                 createThreadOption: function(opts) {
                  console.info(opts);
                     var options = angular.copy(default_thread);
                     opts = opts  || {};
                     angular.extend(options, opts);
                     privateMethods.randomThreadColor(options['init']['datasets']);
                     return options;
                 },

                 randomColor: function(opts,str){
                  var list = [];
                  switch(str){
                    case "color":
                      list = colorList;
                      break;
                    case "highlight":
                      list = highlightList;
                      break;
                    default:
                      list = colorList;
                      break;
                  }
                  for(var i = 0;i < opts.length; i++){
                      opts[i][str] = list[i];
                    }
                 },

                 randomThreadColor:function(opts) {
                 for(var i in opts){
                    if(opts[i]['rgb'] === undefined){
                       var rgb = privateMethods.randomRGB();
                     }else {var rgb = opts[i]['rgb'];}
                     opts[i]['fillColor'] = "rgba("+rgb+",0.2)"; //面积填充
                     opts[i]['strokeColor'] = "rgba("+rgb+",1)"; //轨迹
                     opts[i]['pointColor'] = "rgba("+rgb+",1)";//点填充
                     opts[i]['pointStrokeColor'] = "#fff"; //点静止外环
                     opts[i]['pointHighlightFill'] = "#fff"; //获焦填充
                     opts[i]['pointHighlightStroke'] = "rgba("+rgb+",1)"
                   }
                 },

                 randomRGB: function(){
                   var r=Math.round(Math.random()*256)%255;
                   var g=Math.round(Math.random()*256)%255;
                   var b=Math.round(Math.random()*256)%255;
                   return r+","+g+","+b+"";
                 }

               };
             

              var publicMethods = {
                // 线形图
                createLine:function(opts) {

                  var options = privateMethods.createThreadOption(opts);
                  var ctx = new Charts().create(options['parent']).ctx;
                 // console.info(options);
                  var myLine = new Chart(ctx).Line(options['init'], options['options']);

                },
                // 雷达图
                createRadar:function(opts) {
                  var options = privateMethods.createThreadOption(opts);
                  var ctx = new Charts().create(options['parent']).ctx;
                  var myRadar = new Chart(ctx).Radar(options['init'], options['options']);
                },
                // 柱状图
                createBar:function(opts) {
                  var options = privateMethods.createThreadOption(opts);
                  var ctx = new Charts().create(options['parent']).ctx;
                  var myBar = new Chart(ctx).Bar(options['init'], options['options']);
                },
                // 环形图
                createDoughunt:function(opts) {
                  var options = privateMethods.createCircleOption(opts);
                  var ctx = new Charts().create(options['parent']).ctx;
                  var myDoughunt = new Chart(ctx).Doughnut(options['init'], options['options']);
                },
                // 饼图
                createPie:function(opts) {
                  var options = privateMethods.createCircleOption(opts);

                  var ctx = new Charts().create(options['parent']).ctx;
                  var myPie = new Chart(ctx).Pie(options['init'], {});
                },
                // 极地区图
                createPolararea:function(opts) {
                  var options = privateMethods.createCircleOption(opts);
                  // console.info(options);
                  var ctx = new Charts().create(options['parent']).ctx;
                  var myPolararea = new Chart(ctx).PolarArea(options['init'], options['options']);
                }
                   
                  };
                  
                  return publicMethods;
            }];
           

        });
  
  return m;

  }));
