/**
 * 数据可视化图表  x轴有bug
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
            var defaults = this.defaults = {
              parent: null,
              width: 400,
              height: 500,
              x_text: "X轴",
              y_text: "Y轴",
              fill:null,
              margin: {left: 30,top: 30, right: 50, bottom: 30},
              data: null
            };

            this.$get = ['$document','$templateCache','$compile','$q','$http','$rootScope','$timeout','$window','$controller','error',
            function($document,$templateCache,$compile,$q,$http,$rootScope,$timeout,$window,$controller,error) {
              var Chart = function() {
              };

              Chart.instances = {};
              Chart.prototype = {
                create: function(opts) {
                  this.options = privateMethods.createOption(opts);
                   d3.select(this.options['parent']).append("svg").attr("width",this.options['width']).attr("height",this.options["height"]); 
                   return this;
                },

              };

              var privateMethods = {
                // 数据初始化
                createOption: function(opts) {
                  var options = angular.copy(defaults);
                  opts = opts  || {};
                  angular.extend(options, opts);
                  return options;
                },

                translate: function(left,top) {
                  return d3.select("svg").append("g").attr("transform","translate("+left+","+top+")");
                },

                getDate: function(d) {
                  return new Date(d.jsonDate);
                }

              };

              var publicMethods = {
                line:function(opts) {
                   var svg = new Chart().create(opts);
                   var options = svg.options;
                   var data = options["data"];
                   var x_data = [];
                   var y_data = [];
              
                   for(var i in data){
                      x_data.push(data[i]['key']);
                      y_data.push(data[i]['value']);
                   }
                   var g = privateMethods.translate(options["margin"]["left"],options["margin"]["top"]);
                   var c_width = options["width"] - options["margin"]["left"] - options["margin"]["right"];
                   var c_height = options["height"] - options["margin"]["top"] - options["margin"]["bottom"];
                   var scale_x = d3.scale.linear().domain([0,x_data.length-1]).range([0,c_width]);
                   var scale_y = d3.scale.linear().domain([d3.max(y_data),0]).range([0,c_height]);

                   if(options["fill"]){
                      var area_generator = d3.svg.area().x(function(d,i){return scale_x(i);}).y0(c_height).y1(function(d){return scale_y(d)}).interpolate("cardinal");
                      var path = d3.select("g").append("path").attr("d",area_generator(y_data)).style("fill",options["fill"]);
                   }else{
                    console.log(scale_x);
                      var line_generator = d3.svg.line().x(function(d,i){return scale_x(i);}).y(function(d){return scale_y(d);}).interpolate("cardinal")
                      var path = d3.select("g").append("path").attr("d",line_generator(y_data)).style({"fill":"none","stroke":"#000","stroke-width":2});
                   }
                  
                   

                   var x_axis = d3.svg.axis().scale(scale_x);
                   var y_axis = d3.svg.axis().scale(scale_y).orient("left");

                   g.append("g").call(x_axis).attr("transform","translate(0,"+c_height+")").append("text").text(options["x_text"]).attr({"transform":"translate("+c_width+",0)"});
                   g.append('g').call(y_axis).append('text').text(options["y_text"]).attr({"transform":"rotate(-90)","text-anchor":"end","dy":"1em"})
                },

                column: function(opts) {
                  
                },
                pie: function(opts) {
                  var svg = new Chart().create(opts);
                  var options = svg.options;
                  var data = options["data"];
                  var g = privateMethods.translate(options["width"]/2,options["height"]/2);
                  var arc_generator = d3.svg.arc().innerRadius(options["innerWidth"]).outerRadius(["outerWidth"]);
                  var angle_data = d3.layout.pie().value(function(d){return d.y_text});
                  var color = d3.scale.category10();

                  g.selectAll("path").data(angle_data(data)).enter().append("path").attr("d",arc_generator).style("fill",function(d,i){return color(i)});
                  g.selectAll("text").data(angle_data(data)).enter().append("text").text(function(d){return d.data.x_text}).attr("transform",function(d){return "translate("+arc_generator.centroid(d)+")"}).attr("text-anchor","middle")
                }
              };
              
              return publicMethods;
            }];
           


        });
  
  return m;

  }));
