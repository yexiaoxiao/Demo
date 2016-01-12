'use strict';

var browserCookie = angular.module("LlqCookie",[]);

browserCookie.factory('llqCookie', function ($rootScope,$http,request,guideDialog) {

	this.CreateCookie = function(res) {
		var $scope = $rootScope.$new();
		var cookie = init(res);
		if(getCookie(cookie["cookieName"]) === null){
			request.guideClick(null,function(data) {
				guideDialog.open(data);
			});
		}
		setCookie(cookie);
	};

	function init(opts){
		var defaults = {
			"cookieName": null,
			"cookieValue": null,
			"cookieTime": null
		};

		angular.extend(defaults, opts);
		return defaults;
	}

	function setCookie(opts){
		var date = new Date();
		date.setTime(date.getTime() + opts['cookieTime']*86400000);
		document.cookie = opts["cookieName"]+ "=" + escape(opts["cookieValue"])+";expires="+date.toGMTString();
	}

	function getCookie(name){
		var arr,reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else 
			return null;
	}

	return this;
});