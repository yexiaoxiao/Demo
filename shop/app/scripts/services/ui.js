'use strict';

var ui = angular.module('UI', []);

ui._templateUrl = "module/ui/templates/";

//导航条指令
ui.directive('header', function () {
    return {
        restrict: 'AE',
        templateUrl: ui._templateUrl + "header.html",
        replace: true,
        link: function (scope, element, attrs) {
            var index = attrs.active;
            console.log(index);
        }
    }
});

/*时间日期选择控件

JQ插件地址 ：http://www.bootcss.com/p/bootstrap-datetimepicker/
<input type="text" date-picker="day">日期选择
<input type="text" date-picker="time">日期时间选择

 设置日期开始时间
    <input type="text" date-picker="time" date-picker-start-date="datePickerStart" >;  $scope.datePickerStart = '2015-10-11';
 设置日期结束时间时间
    <input type="text" date-picker="time" date-picker-end-date="datePickerEnd" >;  $scope.datePickerEnd = '2015-10-30';
 更多配置
    <input type="text" date-picker="time" date-picker-config="{minuteStep : 10, todayBtn : true}">;(选项详见JQ插件网站)
 demo：
    <input type="text" ng-model="editEmpower.end_time" readonly date-picker="time"
    date-picker-start-date="datePickerStart" date-picker-end-date="datePickerEnd">
 */
ui.directive('datePicker', ['$filter',function($filter) {
    return {
        restrict: 'A',
        scope : {
            datePicker : '@',
            datePickerStartDate : '=',
            datePickerEndDate : '=',
            datePickerConfig : '@'
        },
        link: function(scope, elm, attrs, ctrl) {
            var config = {
                language:  'zh-CN',
                format : 'yyyy-mm-dd hh:ii',
                autoclose: true
            };

            //时间选择和日期选择 默认时间选择
            if(angular.isDefined(scope.datePicker) && scope.datePicker == 'day'){
                config.format = 'yyyy-mm-dd';
                config.minView = 'month';
            }else{
                config.format = 'yyyy-mm-dd hh:ii';
                config.minView = 'hour';
            }
            //更多配置
            if(angular.isDefined(scope.datePickerConfig)){
                var moreCfg = eval('(' + scope.datePickerConfig + ')');
                for(var i in moreCfg){
                    config[i] = moreCfg[i];
                }
            }
            elm.datetimepicker(config);

            //设置日历开始时间
            if(angular.isDefined(scope.datePickerStartDate)){
                scope.$watch('datePickerStartDate', function(){
                    elm.datetimepicker('setStartDate', scope.datePickerStartDate);
                })
            }
            //设置日历结束时间
            if(angular.isDefined(scope.datePickerEndDate)){
                scope.$watch('datePickerEndDate', function(){
                    elm.datetimepicker('setEndDate', scope.datePickerEndDate);
                })
            }

        }
    };
}]);


/*ui.directive("tab", function(){
 return {
 restrict : 'E',
 scope : {},
 transclude : true,
 replace : true,
 template : "<div><div class='bat-tab'>" +
 "<div class='bat-tab-header'>" +
 "<ul class='list-unstyled'>"+
 '<li ng-if="panel.href" ui-sref="{{panel.href}}" ng-repeat="panel in panels"  ng-click="select(panel)" ng-class="{active:panel.selected}">'+
 '{{panel.title}}' +
 '</li>' +
 '<li ng-if="!panel.href"  ng-repeat="panel in panels"  ng-click="select(panel)" ng-class="{active:panel.selected}">'+
 '{{panel.title}}' +
 '</li>' +
 '</ul>' +
 '</div>' +
 "</div>"+
 '<div ng-transclude></div></div>'
 ,
 link : function(scope, element, attrs){
 },
 controller : function($scope){
 var panels = $scope.panels =[];

 $scope.select = function(panel){
 angular.forEach(panels, function(p) {
 p.selected = false;
 });
 panel.selected = true;
 };
 this.addPane = function(panel) {
 if (panels.length == 0)
 $scope.select(panel);
 panels.push(panel);
 }
 }
 }
 });
 ui.directive("panel", function(){
 return {
 require: "^tab",
 restrict : 'E',
 scope: {
 title: "@",
 href : "@"
 },
 transclude : true,
 replace : true,
 template : "<div class='bat-tab-content' ng-show='selected' ng-transclude></div>",
 link : function(scope, element, attrs, tabCtrl){
 if(scope.href == undefined){
 scope.href = false;
 }
 tabCtrl.addPane(scope);
 }
 }
 });*/



//分页导航
//<tab>
//<panel title="资产设置">11</panel>
//<panel title="标签设置">22</panel>
//</tab>
ui.directive("tab", function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        replace: true,
        template: "<div><div class='bat-tab-details'>" +
        "<div class='bat-tab-details-header'>" +
        "<ul class='list-unstyled'>" +
        '<li ng-if="panel.href" ui-sref="{{panel.href}}" ng-repeat="panel in panels"  ng-click="select(panel)" ng-class="{active:panel.selected}">' +
        '{{panel.title}}' +
        '</li>' +
        '<li ng-if="!panel.href"  ng-repeat="panel in panels"  ng-click="select(panel)" ng-class="{active:panel.selected}">' +
        '{{panel.title}}' +
        '</li>' +
        '</ul>' +
        '</div>' +
        "</div>" +
        '<div ng-transclude></div></div>',
        link: function (scope, element, attrs) {
        },
        controller: function ($scope) {
            var panels = $scope.panels = [];

            $scope.select = function (panel) {
                angular.forEach(panels, function (p) {
                    p.selected = false;
                });
                panel.selected = true;
            };
            this.addPane = function (panel) {
                if (panels.length == 0)
                    $scope.select(panel);
                panels.push(panel);
            }
        }
    }
});
ui.directive("panel", function () {
    return {
        require: "^tab",
        restrict: 'E',
        scope: {
            title: "@",
            href: "@"
        },
        transclude: true,
        replace: true,
        template: "<div class='bat-tab-content' ng-show='selected' ng-transclude></div>",
        link: function (scope, element, attrs, tabCtrl) {
            if (scope.href == undefined) {
                scope.href = false;
            }
            tabCtrl.addPane(scope);
        }
    }
});


//左侧多页面板切换
ui.directive('batAccordion', function () {
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            height: "@"    //设置空间的高度（当值为负时，即根据窗口高度动态的调节高度）
        },
        template: "<div class='bat-toggle-panel'></div>",
        controller: function ($scope) {
            var panels = $scope.panels = [];

            this.addPanel = function (panel) {
                if (panels.length == 0)
                    panel.show = true;
                panels.push(panel);

                //重设高度
                var h = $(window).height() + parseInt($scope.height) - panels.length * 35;
                angular.forEach(panels, function (_panel) {
                    _panel.height = h + 'px';
                });
            };
            this.setOpen = function (panel) {
                angular.forEach(panels, function (_panel) {
                    if (panel != _panel)
                        _panel.show = false;
                })
            };
        },

        link: function (scope, element, attrs, ctrl, transclude) {
            //替换transclude的scope为ctrl的scope
            transclude(scope.$parent, function (clone, scope) {
                element.append(clone);
            });
        }
    }
});

ui.directive('batAccordionPanel', function () {
    return {
        require: "^batAccordion",
        restrict: "E",
        transclude: true,
        replace: true,
        scope: {
            panelTitle: '@',
            titleClickEvent : '=',
            hasBar: '='
        },
        template: "<div class='bat-toggle-panel-item'>" +
        "<div class='bat-toggle-panel-item-title' ng-click='toggle()'>{{panelTitle}}</div>" +
        "<div class='bat-toggle-panel-item-content' ng-show='show' style='height: {{height}}; padding-top: {{paddingTop}}'>" +
        "<div class='bat-toggle-panel-item-main'></div>" +
        "</div>" +
        "</div>",
        controller: function ($scope) {
        },
        link: function (scope, element, attrs, ctrl, transclude) {
            //未定义hasBar或者 has=true，添加padding-top
            if (angular.isDefined(scope.hasBar) == true && scope.hasBar == false) {
                scope.paddingTop = '0px';
            }
            else {
                scope.paddingTop = '30px';
            }
            scope.height = "50px";
            scope.show = false;
            ctrl.addPanel(scope);

            scope.toggle = function () {
                scope.show = true;
                ctrl.setOpen(scope);

                scope.titleClickEvent && scope.titleClickEvent();
            };
            //替换transclude的scope为ctrl的scope
            transclude(scope.$parent, function (clone, scope) {
                element.find('.bat-toggle-panel-item-main').append(clone);
                var btns = element.find('.bat-toggle-panel-item-btns');
                btns.remove();
                element.find('.bat-toggle-panel-item-content').append(btns);

            });
        }
    }
});


//表单远程校验
ui.directive("remoteUniqueCheck", ['request',
    function (request) {
        return {
            require: "ngModel",
            link: function (scope, elem, attrs, ngModel) {
                //console.log(scope);
                //验证方法
                var doValidate = function () {
                    var arr = StringToArray(attrs.remoteUniqueCheck);
                    var Name = arr[0];
                    var Value = (arr.length == 2) ? ngModel.$viewValue + ',' + arr[1] : ngModel.$viewValue;

                    console.info(Name,Value);
                    request.ValidateRepeat({"model": Name, "propertyValue": Value}, function (result) {
                        console.log(result);
                        if (result == "isExist") {
                            console.log("有重复不能插入");
                            ngModel.$setValidity('romoteuniquecheck', false);
                        }
                        if (result == "inExist") {
                            console.log("不重复可以插入");
                            ngModel.$setValidity('romoteuniquecheck', true);
                        }
                    }, {isShowLoading : false} );

                };
                //..
                ngModel.$viewChangeListeners.push(doValidate)
            }
        };
    }
]);


//密码重复检验
ui.directive('pwCheck', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            console.log(firstPassword);
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    }
}]);


//按钮点击后移除焦点
ui.directive('removeBlur', [function () {
    return {
        restrict:"AE",
        link:function(scope,element,attrs){
            element.bind('mouseout', function() {
                //var button = $('button');
                var button =attrs.$$element;
                //console.log(button);
                button.blur();
            });
        }
    }
}]);

/*ui.directive('inputClear',[function(){
    return{
        restrict:"AE",
        scope:{
            clearAll:"="
        },
        template:'<a ng-click="inputBtnClear()"></a>',
        controller:function(scope){
         scope.inputBtnClear= function(){
             scope.clearAll="";
         }
        },
        link:function(scope,element,attrs){
            console.info(scope,element,attrs)
        }
    }

}]);*/

ui.directive('clearBtn',[function(){
    return{
        restrict:"AE",
        require: 'ngModel',
        scope : {
            clearKey : '=',
            onClear : '='
        },
        link:function(scope,element, attrs, ngModel){

            var $clearBtn = $("<a class='clearInputBtn'></a>");
            element.parent().append($clearBtn);

            scope.$watch('ngModel.$modelValue',function(){
                if(ngModel.$isEmpty(ngModel.$modelValue))
                    $clearBtn.hide();
            });

            $clearBtn.on('click', function(){
                ngModel.$setViewValue('');
                ngModel.$render();

                if(scope.clearKey)
                    scope.clearKey = '';

                scope.onClear&&scope.onClear();
            });

            ngModel.$viewChangeListeners.push(function(){
                if(ngModel.$isEmpty(ngModel.$modelValue))
                    $clearBtn.hide();
                else
                    $clearBtn.show();
            });
        },
    }
}]);

//正整数
var INTEGER_REGEXP = /^[1-9]\d*$/;
ui.directive("integer", ['batDialog',
    function (batDialog) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (INTEGER_REGEXP.test(viewValue)) {
                        ctrl.$setValidity('integer', true);
                        return viewValue;

                    } else {
                        ctrl.$setValidity('integer', false);
                        return undefined;

                    }
                });
            }
        };
    }]);


//TODO 存在bug，当使用val改变input值时，不会触发事件。
//top, right, bottom
/*
ui.directive('errorShow', ['error',
        function (error) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModel) {

                    var type = ''; //top, right, bottom 默认top
                    type = attrs.errorShow;
                    if (angular.isDefined(type) == false || type == '' || type == null)
                        type = 'top';

                    var $parent = elem.parent();
                    var $error = $('<div class="ui-error"></div>');
                    var offset = elem.offset();
                    var offset2 = $parent.offset();
                    $parent.append($error);
                    var eSize = {
                        w: elem.width(),
                        h: elem.height()
                    };
                    if (type == 'top') {
                        $error.addClass('top');
                        $error.css({
                            'left': offset.left - offset2.left + 'px',
                            'top': offset.top - offset2.top - 26 + 'px'
                        });
                    } else if (type == 'right') {
                        $error.addClass('right');
                        $error.css({
                            'left': offset.left - offset2.left + eSize.w + 25 + 'px',
                            'top': 0 + 'px'
                        });
                    } else if (type == 'bottom') {
                        $error.addClass('bottom');
                        $error.css({
                            'left': offset.left - offset2.left + 'px',
                            'top': offset.top - offset2.top + eSize.h + 7 + 'px'
                        });
                    }

                    //判定规则，按对象中属性顺序依次判定，如果符合，则显示错误信息
                    var rule = {
                        'url': '108',
                        'email': '109',
                        'number': '110',
                        'min': '101',
                        'max': '102',
                        'minlength': '103',
                        'maxlength': '104',
                        'required': '105',
                        'pattern': '106',
                        'romoteuniquecheck': '107',
                        'pwmatch': '156'
                    };
                    if (angular.isDefined(attrs.errorShowRule) && attrs.errorShowRule != '') {
                        rule = eval("(" + attrs.errorShowRule + ')');
                    }

                    //将所有的input框及对应的数据存储到一个数组中，之后依次遍历改数组进行判定
                    if (angular.isDefined(scope._checkModels) == false)
                        scope._checkModels = [];
                    scope._checkModels.push({
                        data: ngModel,
                        el: $error,
                        rule: rule
                    });

                    //判定程序
                    function doValidate() {
                        console.log(' doValidate ');
                        //隐藏所有错误提示框
                        for (var i in scope._checkModels) {
                            scope._checkModels[i].el.stop(true, false).fadeOut(300);
                        }
                        //遍历每个input对应的model，如果验证不通过的，且验证条件中存在该规则，显示错误信息
                        for (var i in scope._checkModels) {
                            var obj = scope._checkModels[i];
                            if (obj['data']['$valid'] == false) {
                                for (var k in obj['rule']) {
                                    if (angular.isDefined(obj.data.$error[k]) && obj.data.$error[k] == true) {
                                        obj.el.stop(true, false).fadeIn(300);
                                        obj.el.empty().append(error.code[obj['rule'][k]]);
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }

                    //存在bug，初始ngModel中$valid值为true，需设置一个值使ngModel生效
                    //ngModel.$setViewValue(ngModel.$modelValue);
                    //创建时调用判定程序，显示第一个错误框
                    doValidate();

                    //input监听事件
                    elem.on('blur keyup change', function () {
                        doValidate();
                    });
                }
            }
        }]
);
*/

ui.directive("batValidate", ['error',
    function (error) {
        return {
            link: function (scope, elm, attrs) {

                //获取表单数据 表单name值不能为空
                var formName = attrs.name || '';

                //气泡提示框默认规则
                var rule = {
                    'url': '108',
                    'email': '109',
                    'number': '110',
                    'min': '101',
                    'max': '102',
                    'minlength': '103',
                    'maxlength': '104',
                    'required': '105',
                    'pattern': '106',
                    'romoteuniquecheck': '107',
                    'pwmatch': '156'
                };

                //对input添加气泡提示
                function addErrShow(obj){
                    var errorPosition = obj.attr('error-show') || 'top';
                    var errorRule = obj.attr('error-show-rule') || '';
                    var inputModel = angular.element(obj).controller('ngModel');
                    var errorText = '';

                    if(errorRule != ''){
                        errorRule = eval("(" + errorRule + ')');
                    }
                    else
                        errorRule = rule;

                    //生成错误提示信息
                    for (var k in errorRule) {
                        if (angular.isDefined(inputModel.$error[k]) && inputModel.$error[k] == true) {
                            errorText = error.code[errorRule[k]];
                            break;
                        }
                    }

                    var $parent = obj.parent();
                    var $error = $('<div class="ui-error">' + errorText + '</div>');
                    var offset = obj.offset();
                    var offset2 = $parent.offset();
                    $parent.append($error);
                    var eSize = {
                        w: obj.width(),
                        h: obj.height()
                    };
                    if (errorPosition == 'top') {
                        $error.addClass('top');
                        $error.css({
                            'left': offset.left - offset2.left + 'px',
                            'top': offset.top - offset2.top - 26 + 'px'
                        });
                    } else if (errorPosition == 'right') {
                        $error.addClass('right');
                        $error.css({
                            'left': offset.left - offset2.left + eSize.w + 25 + 'px',
                            'top': 0 + 'px'
                        });
                    } else if (errorPosition == 'bottom') {
                        $error.addClass('bottom');
                        $error.css({
                            'left': offset.left - offset2.left + 'px',
                            'top': offset.top - offset2.top + eSize.h + 7 + 'px'
                        });
                    }
                    $error.fadeIn(300);
                }

                //确认弹窗页面将调用该函数
                scope._bat_validate = function(_formObj){

                    _formObj = _formObj || elm;

                    //移除所有冒泡
                    _formObj.find('.ui-error').remove();
                    var isAddErrorShow = false;

                    //遍历每个input框
                    _formObj.find('input,textarea,select').each(function(){
                        //先移除每个红框样式
                        $(this).removeClass('bat-invalid');

                        //验证不通过的input
                        if($(this).hasClass('ng-invalid') == true){
                            if($(this).attr('disabled') == 'disabled'){
                                return;
                            }
                            //如果为第一个验证未通过的input框，则添加提示框 弹出提示框的位置及规则根据当前元素的 error-show,error-show-rule来设置
                            if(isAddErrorShow == false){
                                isAddErrorShow = true;
                                addErrShow($(this));
                            }
                            $(this).addClass('bat-invalid');
                        }
                    });

                    return !isAddErrorShow;
                };

                function addInputEvent(){
                    //遍历每个input框
                    elm.find('input,textarea,select').each(function(){
                        //获得焦点时事件
                        $(this).focus(function(){
                            $(this).removeClass('bat-invalid');
                            $(this).parent().find('.ui-error').remove();
                        });
                        $(this).blur(function(){
                            if($(this).hasClass('ng-invalid') == true){
                                elm.find('.ui-error').remove();
                                $(this).addClass('bat-invalid');
                                addErrShow($(this));
                            }
                        });
                        //去除disable元素的报错提示
                        $(this).change(function(){
                            $('input:disabled').each(function(){
                                $(this).removeClass('bat-invalid');
                                $(this).parent().find('.ui-error').remove();
                            })
                        });
                    })
                }
                addInputEvent();

                elm.on('click', function(){
                    addInputEvent();
                });
            }
        };
    }]);




ui.directive('icon', function() {
    return {
        restrict: 'E',
        template: '<img></img>',
        replace: true
    };
});