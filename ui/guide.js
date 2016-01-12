/**
 * 引导
 */

(function(root,factory) {
	if(typeof module !== 'undefined' && module.exports){
		module.exports = factory(require('angular'));
	}else if(typeof define === 'function' && define.amd){
		define(['angular'],factory);
	}else{
		factory(root.angular);
	}
}(this,function(angular) {
	'use strict';

	var m = angular.module('GuideDialog',[]);
	var $el = angular.element;

	m.provider('guideDialog', function () {
		var defaults = this.defaults = [{
			size:{width: 745,height: 329},
			url:'../images/guide11.png',
			position: {top:50,left:50},
			hasNext: null,
			hasClose: null
		}];

		var mask = $el('<div class="guide-main"><div class="guide-mask"></div></div>');

		$('body').append(mask);
		mask.css("zIndex",1000);
		mask.hide();

		this.$get = ['$document','$templateCache','$compile','$q','$http','$rootScope','$timeout','$window','$controller','error', 
			function($document,$templateCache,$compile,$q,$http,$rootScope,$timeout,$window,$controller,error) {
				
				function Guide () {
					
				}

				Guide.interface = [];
				Guide.prototype = {
					createGuide: function(template) {
						var d = $el('<div class="guide-stepbox"></div>');
						Guide.interface.push(d);
						this.setMask();	
						mask.append(d);
						d.show();
						return d;
					},
					createOption: function(opts) {
						var options = angular.copy(defaults);
						angular.extend(options, opts);
						return options;

					},
					setMask: function() {
						if(Guide.interface != 0){
							mask.show();
						}else{
							mask.hide();
						}
					},
					create: function(opts) {
						this.options = this.createOption(opts);
						this.$guide = this.createGuide();
						this.step = [];
						this.scope = angular.isObject(this.options.scope) ? this.options.scope.$new() : $rootScope.$new();
						var that = this;
						for(var i in this.options){
							var d = $el('<div class="guide-step"></div>');
							this.setSize(d,this.options[i]['size']);						
							this.setPosition(d,this.options[i]['position']);
							if(this.options[i]['hasNext']){
								var next = $el('<div class="guide-next"></div>');
								d.append(next);
								this.setSize(next,this.options[i]['hasNext']);
								this.setPosition(next,this.options[i]['hasNext']);
							}

							if(this.options[i]['hasClose']){
								var close = $el('<div class="guide-close"></div>');
								d.append(close);
								this.setSize(close,this.options[i]['hasClose']);
								this.setPosition(close,this.options[i]['hasClose']);
							}

							d.css('background-image','url('+this.options[i]['url']+')');
							d.hide();
							this.step.push(d);
							this.$guide.append(d);
						}

						// this.scope.closeClick = function() {
						// 	that.close();
						// }

						// this.scope.nextStepClick = function(index) {
						// 	if(index < that.step.length-1)
						// 		that.nextStep(index);
						// 	else
						// 		that.close();
						// };
						$compile(this.$guide)(this.scope);
						//mask.append(this.$guide);
						this.$guide.find('.guide-step:first,.guide-stepbox').show();

						this.$guide.find(".guide-next").click(function() {
							$(this).parent().hide().next().show();
						});
						this.$guide.find(".guide-next:last,.guide-close").click(function() {
							$(this).parent().hide();
							that.$guide.parent().hide();

						});

						this.setMask();
						return this;
					},
					setSize: function(obj,size) {
						if(size && angular.isObject(size)){
							obj.css({
								'width': size['width']+'px',
								'height': size['height']+'px'
							});
						}else if(size && angular.isString(size)){
							obj.css(size);
						}
					},
					setPosition: function(obj,position) {
						if(position && angular.isObject(position)){
							for(var i in position){
								obj.css(i , position[i] + 'px');
							}
						}else if(position && angular.isString(position)){
							obj.css(position);
						}
					},
					// nextStep: function(index) {
					// 	var stepList = mask.find('.guide-step');
					// 	stepList.eq(index).hide();
					// 	stepList.eq(index).next().show();
					// },
					// close: function() {
					// 	Guide.interface = [];
					// 	this.setMask();
					// }
				};

				var publicMethods = {
					open: function(opts) {
						var d = new Guide().create(opts);
						var $guide = d.$guide;
						var options = d.opts;
						var scope = d.scope;

						$compile($guide)(scope);

						return d;
					}
				};

				return publicMethods;
		}];

	})

}));