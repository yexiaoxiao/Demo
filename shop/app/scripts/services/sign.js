'use strict';

var signModule = angular.module("SignModule", []);

signModule.controller("signInCtrl", function ($scope, $http, $state, $stateParams, request) {

    $scope.signData = {
        user_name: '',
        password: ''
    };
    $scope.isShowLoading = false;
    $scope.isShowCheck = false;
    $scope.errorText = '';

    //登录按钮
    $scope.signInClick = function () {
        $scope.errorText = '';
        if ($scope.signData.user_name == '') {
            $scope.errorText = '请填写账户';
            return
        }
        if ($scope.signData.password == '') {
            $scope.errorText = '请填写密码';
            return
        }

        $scope.isShowLoading = true;

        var reqData = angular.copy($scope.signData);
        reqData.password = $.md5(reqData.password);

        request.UserSignIn(reqData, function (res) {
            console.log(reqData);
            console.log(res);
            $scope.isShowLoading = false;
           if (res['password'] == reqData['password']) {
                alert('登录成功')
                $state.go('index');
            } else {
                alert('登录失败')
            }
        }, {
            isShowLoading: false
        });
    };

    $scope.signInPress = function(event){
        if(event.keyCode == 13){
            $scope.signInClick();
        }
    };

    $scope.clearInClick = function () {
        $scope.signData.user_name = "";
        $scope.signData.password = ""
    }

});

signModule.controller("signOutCtrl", function ($scope, $http, $state, $stateParams, request) {

    //获取当前登录用户信息
    request.UserGetLoginInfo(null, function (res) {
        if (res == null)
            $state.go('signIn');
        else
            $scope.userInfoData = res;
    });

    //退出按钮
    $scope.signOutClick = function () {
        request.UserSignOut(null, function (res) {
            if (eval(res) == '1')
                $state.go('signIn');
        });
    }
});