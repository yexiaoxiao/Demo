/*

 bat项目的所有弹窗创建

 alert：提示弹出框
 confirm：对话框（确定，取消）
 open：最基本的弹出框（无底部按钮）
 pagination：分页弹出框（上一步，下一步，确定，取消）

 select：单列选择弹出框
 multipleSelect：两列选择弹出框
 selectCheckBox：带有checkBox的多选步面

 关于confirm及pagination的确定按钮验证：
 如需添加此功能，请在html中添加<form name='xxxx'></form>，name属性必须定义
 如果嵌套多层form，只获取最外层form

 创建 alert，confirm，open，pagination 时传入以下的参数结构
 options = {
 title : '提示',                              //提示框标题
 parent : null,                             //父节点，如果为null，则添加到body
 scope : null,                              //需要绑定的scope（继承scope创建新的scope）
 template : null,                           //html代码字符串
 templateUrl : null,                        //html文件路径 （template与templateUrl只能用一个）
 cache : true,                              //设置html是否缓存 默认为true
 hasClose : true,                           //是否有关闭按钮 默认为true
 size : {width:500, height:300},            //窗口大小
 css : {right:'0px', bottom: '0px'},        //添加样式，当该值不为空时，默认居中样式不添加及设定窗口大小时不再默认居中
 onConfirm : null,                          //创建confirm pagination时设置 确定按钮的事件 返回参数为弹出框的scope
 onCancel : null                            //取消按钮事件
 }

 创建 select(data, callback) 单选界面
 data={
 title : "选择",           //弹出框标题
 data : null,            //左侧被选择数据（当设定该值时，不需要再设定http和httpData）
 key : null,             //树结构中数据的key
 http  : null,           //左侧被选择数据的请求
 httpData : null,        //设定请求数据
 afterGetData : null     //获得请求数据后处理 function(data){ return data;}
 }
 callback(selects)
 select 选中的对象 {}

 创建 multipleSelect(data, callback) 多选界面（选中节点时 不关联 是否选中父节点及子节点）
 data={
 title : "选择",          //弹出框标题
 data : null,            //左侧被选择数据（当设定该值时，不需要再设定http和httpData）
 key : null              //树结构中数据的key
 http  : null,           //左侧被选择数据的请求
 httpData : null,        //设定请求数据
 afterGetData : null,    //获得请求数据后处理 function(data){ return data;}
 isShowAction : true，    //设置左侧选中添加到右侧时，左侧中是否删除。默认为true
 defaultCheck : {        //默认选中配置
 //已选中的value的数组 一般为id数组
 }
 }
 callback(selects)
 select中返回选中的对象数组 [{}, {}]

 创建 selectCheckBox(data, callback)（选中节点时 关联 是否选中父节点及子节点）
 data={
 title : "选择",          //弹出框标题
 data : null,            //左侧被选择数据（当设定该值时，不需要再设定http和httpData）
 key : null              //树结构中数据的key
 http  : null,           //左侧被选择数据的请求
 okText : '确定',         //确定按钮定义
 httpData : null,        //设定请求数据
 afterGetData : null,    //获得请求数据后处理 function(data){ return data;}
 unableLevel : 0,        //根据深度设定该节点是否可以选中 1：深度为1的不能被选中，2:深度为1,2的不能被选中，默认为0，即所有可选
 defaultCheck : {        //默认选中配置
 key : '',               //对应数据结构中的key
 list : []               //已选中的value的数组 一般为id数组
 }
 }
 callback(selects)
 select中返回选中的对象数组 [{depth, data}, {depth, data}]

 --------------DEMO---------------
 batDialog.alert({
 title : '提示',
 template : "请重试"
 });
 batDialog.alert('请重试');

 batDialog.confirm({
 title : '提示',
 template : "请重试",
 scope : $scope,
 onConfirm : function(scope){
 console.log(scope);
 },
 controller: ['$scope', function($scope) {
 }]
 });

 batDialog.open({
 title : '提示',
 template : "请重试",
 onConfirm : function(scope){
 console.log(scope);
 },
 controller: ['$scope', function($scope) {
 }]
 });

 batDialog.pagination({
 title : '提示',
 templateUrl : "demo.html",
 onConfirm : function(scope){
 console.log(scope);
 },
 controller: ['$scope', function($scope) {
 }]
 });

 demo.html
 <dialog-page>
 <dialog-page-panel title="常规">1</dialog-page-panel>
 <dialog-page-panel title="静态资产">2</dialog-page-panel>
 <dialog-page-panel title="温度">3</dialog-page-panel>
 <dialog-page-panel title="湿度">4</dialog-page-panel>
 </dialog-page>

 batDialog.multipleSelect({
 title : '选择组',
 data : null,
 http : request,
 httpDta : null,
 key : 'group_name',
 isShowAction : true
 }, function(array){
 var str = ArrayToString(array, 'group_name');
 var ids = ArrayToString(array, 'group_id');
 $scope.editAsset.group_ids = ids;
 $scope.editAsset.group_name = str;
 }
 );

 batDialog.selectCheckBox({
 title : '绑定部门',
 http : request.AssetGetDepartmentTree,
 httpData : null,
 unableLevel : 0
 }, function(selectData){
 console.log(selectData);
 }
 );
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

        var m = angular.module('BatDialog', []);

        var $el = angular.element;

        m.provider('batDialog', function () {
            var defaults = this.defaults = {
                title: '提示',       //提示框标题
                parent: null,
                scope: null,
                template: null,
                templateUrl: null,
                cache: true,
                hasClose: true,
                hasMask: true,
                size: null,
                css: null,
                okText: '确定',
                //创建confirm pagination时设置
                onConfirm: null,
                onCancel: null
            };

            var globalId = 0;
            var mask = $el("<div class='ui-mask'></div>");
            $('body').append(mask);
            mask.hide();

            this.$get = ['$document', '$templateCache', '$compile', '$q', '$http', '$rootScope', '$timeout', '$window', '$controller', 'error',
                function ($document, $templateCache, $compile, $q, $http, $rootScope, $timeout, $window, $controller, error) {

                    function Dialog() {
                    }

                    Dialog.instances = [];
                    Dialog.prototype = {

                        //创建弹出框html 结构
                        createDialog: function (template) {
                            globalId += 2;
                            template = template || '';
                            var d = $el("<div class='ui-dialog' id='dialog" + globalId + "'>" +
                                "<div class='ui-dialog-bg'><div class='ui-dialog-bg2'><div class='ui-dialog-bg3'></div></div></div>" +
                                "<div class='ui-dialog-title'></div>" +
                                "<div class='ui-dialog-content'>" +
                                "<div class='ui-dialog-content-main'></div>" +
                                "<div class='ui-dialog-content-buttons'></div>" +
                                "</div>" +
                                "</div>");

                            this.id = globalId;
                            Dialog.instances.push({
                                id: this.id,
                                hasMask: this.opts.hasMask
                            });

                            d.css({'z-index': globalId + 1000});

                            this.setMask();
                            return d;
                        },
                        setMask: function () {
                            if (Dialog.instances.length > 0) {
                                var isShow = 0;
                                for (var i in Dialog.instances) {
                                    if (Dialog.instances[i]['hasMask'] == true) {
                                        mask.css({'z-index': Dialog.instances[i]['id'] + 1000 - 1});
                                        mask.show();
                                    }
                                    isShow += Dialog.instances[i]['hasMask'];
                                }
                                if (isShow == 0) {
                                    mask.hide();
                                }
                            }
                            else {
                                mask.hide();
                            }
                        },
                        //option初始化
                        createOption: function (opts) {
                            var options = angular.copy(defaults);
                            opts = opts || {};
                            angular.extend(options, opts);
                            return options;
                        },
                        create: function (opts) {
                            this.opts = this.createOption(opts);
                            this.$dialog = this.createDialog();
                            var that = this;

                            this.$dialog.find('.ui-dialog-title').html(this.opts.title);

                            if (this.opts.hasClose)
                                this.$dialog.append("<div class='ui-dialog-close' ng-click='closeThisDialog()'><img src='images/btn-close.png'></div>");

                            this.scope = angular.isObject(this.opts.scope) ? this.opts.scope.$new() : $rootScope.$new();
                            this.scope.error = error.code;
                            this.errorCode = null;

                            this.scope.closeThisDialog = function () {
                                that.opts.onCancel && that.opts.onCancel();
                                that.close();
                            };
                            $compile(this.$dialog)(this.scope);

                            if (this.opts.size)
                                this.setSize(this.opts.size);
                            if (this.opts.css)
                                this.$dialog.css(this.opts.css);
                            else
                                this.$dialog.addClass('ui-dialog-init');

                            if (this.opts.parent != null)
                                this.opts.parent.append(this.$dialog);
                            else
                                $('body').append(this.$dialog);

                            return this;
                        },
                        setSize: function (size) {
                            this.opts.size = size;
                            if (this.opts.size && angular.isObject(this.opts.size)) {
                                this.$dialog.css({
                                    width: this.opts.size.width + 'px',
                                    height: this.opts.size.height + 'px'
                                });
                            }
                            if (this.opts.css == null) {
                                this.$dialog.css({
                                    'margin-left': this.opts.size.width / -2 + 'px',
                                    'margin-top': this.opts.size.height / -2 + 'px'
                                });
                            }
                        },
                        close: function () {
                            for (var i in Dialog.instances) {
                                if (Dialog.instances[i]['id'] == this.id)
                                    Dialog.instances.splice(i, 1);
                            }
                            globalId -= 2;
                            this.setMask();
                            this.scope.$destroy();
                            this.$dialog.remove();
                        }
                    };

                    var privateMethods = {

                        //http请求加载html
                        loadTemplateUrl: function (tmpl, config) {
                            return $http.get(tmpl, (config || {})).then(function (res) {
                                return res.data || '';
                            });
                        },
                        //加载html
                        loadTemplate: function (template, templateUrl, isCache, callback) {
                            var self = this;

                            function load() {
                                if (template) {
                                    return template;
                                }
                                if (templateUrl) {
                                    if (typeof isCache === 'boolean' && !isCache) {
                                        return self.loadTemplateUrl(templateUrl, {cache: false});
                                    }
                                    else {
                                        return ($templateCache.get(templateUrl) || self.loadTemplateUrl(templateUrl, {cache: true}));
                                    }
                                }
                            }

                            $q.when(load()).then(function (template) {
                                $templateCache.put(templateUrl, template);
                                callback(template);
                            });
                        }
                    };

                    var publicMethods = {
                        //提示框（只有一个确定按钮）
                        alert: function (opts) {
                            var d = new Dialog().create(opts);
                            var $dialog = d.$dialog;
                            var options = d.opts;
                            var scope = d.scope;

                            if (angular.isString(opts)) {
                                $dialog.find('.ui-dialog-content-main').append("<div class='form'>" + opts + "</div>");
                            }
                            else {
                                $dialog.find('.ui-dialog-content-main').append("<div class='form'>" + options.template + "</div>");
                            }
                            $dialog.find('.ui-dialog-content-buttons').append('<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="closeThisDialog()">' + options.okText + '</button>');

                            d.setSize({
                                width: 350,
                                height: 140
                            });
                            $compile($dialog)(scope);
                            return d;
                        },
                        //对话框（确定，取消按钮）
                        confirm: function (opts) {

                            var d = new Dialog().create(opts);
                            var $dialog = d.$dialog;
                            var options = d.opts;
                            var scope = d.scope;

                            privateMethods.loadTemplate(options.template, options.templateUrl, options.cache, function (template) {

                                $dialog.find('.ui-dialog-content-main').append(template);

                                //取html中第一次form表单的name 绑定到验证 到确定按钮上
                                var formInvalid = false;
                                if ($dialog.find('form').length == 0) {
                                    Warn('弹框中未发现 form，确定按钮不添加验证');
                                }
                                else {
                                    formInvalid = $dialog.find('form').attr('name') + '.$invalid';
                                }

                                $dialog.find('.ui-dialog-content-buttons').append('' +
                                    '<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="closeThisDialog()">取消</button>' +
                                '<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="okClick()">' + options.okText + '</button>');
                                //'<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="okClick()" ng-disabled="' + formInvalid + '">' + options.okText + '</button>');

                                scope.okClick = function () {
                                    if(scope._bat_validate){
                                        if(scope._bat_validate() == false){
                                            return;
                                        }
                                    }
                                    scope.errorCode = null;
                                    if (options.onConfirm) {
                                        var isClose = options.onConfirm(scope);
                                        if (isClose != false)
                                            d.close();
                                    }
                                };

                                if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {
                                    var controllerInstance = $controller(options.controller, {
                                        $scope: scope,
                                        $element: $dialog
                                    });
                                    $dialog.data('$ngDialogControllerController', controllerInstance);
                                }

                                $compile($dialog)(scope);
                            });
                            return d;
                        },
                        //标准对话框，只创建窗体
                        open: function (opts) {

                            var d = new Dialog().create(opts);
                            var $dialog = d.$dialog;
                            var options = d.opts;
                            var scope = d.scope;

                            privateMethods.loadTemplate(options.template, options.templateUrl, options.cache, function (template) {

                                $dialog.find('.ui-dialog-content-main').html(template);
                                $dialog.find('.ui-dialog-content-buttons').remove();
                                $dialog.find('.ui-dialog-content').css('padding-bottom', '0');


                                if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {
                                    var controllerInstance = $controller(options.controller, {
                                        $scope: scope,
                                        $element: $dialog
                                    });
                                    $dialog.data('$ngDialogControllerController', controllerInstance);
                                }
                                $compile($dialog)(scope);
                            });
                            return d;
                        },

                        //分步对话框（上一步，下一步，确定，取消）
                        pagination: function (opts) {
                            var d = new Dialog().create(opts);
                            var $dialog = d.$dialog;
                            var options = d.opts;
                            var scope = d.scope;
                            scope.onNextPage = d.opts.onNextPage;
                            scope.okDisabled = options.okDisabled;

                            privateMethods.loadTemplate(options.template, options.templateUrl, options.cache, function (template) {

                                $dialog.find('.ui-dialog-content-main').append(template);

                                //取html中第一次form表单的name 绑定到验证 到确定按钮上
                                var formInvalid = false;
                                var parentFormName = $dialog.find('form').attr('name');

                                if ($dialog.find('form').length == 0) {
                                    Warn('弹框中未发现 form，确定按钮不添加验证');
                                }
                                else {
                                    formInvalid = $dialog.find('form').attr('name') + '.$invalid';
                                }

                                $dialog.find('.ui-dialog-content-buttons').append('<button type="button"  class="btn btn-default btn-xs bat-btn-nor" ng-click="_dCloseThisDialog()">取消</button>' +
                                    '<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="_dOkClick()"  ng-disabled="_dConfirmDisable||' + formInvalid + '">' + options.okText + '</button>' +
                                //'<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="_dNextPage()" ng-disabled="_dNextDisable || ' + parentFormName + '[childFormNames[_dShowIndex]].$invalid' + '">下一步</button>' +
                                '<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="_dNextPage()" ng-disabled="_dNextDisable">下一步</button>' +
                                //'<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="_dLastPage()" ng-disabled="_dLastDisable||' + formInvalid + '">上一步</button>');
                                '<button type="button" class="btn btn-default btn-xs bat-btn-nor" ng-click="_dLastPage()" ng-disabled="_dLastDisable">上一步</button>');

                                scope._dCloseThisDialog = function () {
                                    d.close();
                                };
                                scope._dOkClick = function () {
                                    scope.errorCode = null;
                                    if (options.onConfirm) {
                                        var isClose = options.onConfirm(scope);
                                        if (isClose != false)
                                            d.close();
                                    }
                                };


                                if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {
                                    var controllerInstance = $controller(options.controller, {
                                        $scope: scope,
                                        $element: $dialog
                                    });
                                    $dialog.data('$ngDialogControllerController', controllerInstance);
                                }
                                $compile($dialog)(scope);
                            });

                            return d;
                        },
                        //弹出选择页 （单选）
                        select: function (data, callback) {
                            var option = {
                                title: "选择",
                                data: null,
                                key: null,
                                http: null,
                                httpData: null,
                                okText: '确定',
                                afterGetData: null,
                                defaultSelect: null,
                                defaultCheck: {        //默认选中配置
                                    key: '',               //对应数据结构中的key
                                    list: []               //已选中的value的数组 一般为id数组
                                }
                            };
                            angular.extend(option, data);

                            var dialog = this.confirm({
                                title: option.title,
                                size: {width: 350, height: 480},
                                templateUrl: 'module/ui/templates/dialogSelect.html',
                                okText: option.okText,
                                onConfirm: function (scope) {
                                    callback && callback(scope.selectData,scope.depth);
                                },
                                controller: ['$scope', 'batTreeView', function ($scope, batTreeView) {
                                    $scope.selectData = null;
                                    var tree = batTreeView.create({
                                        parent: '#treeViewParent',
                                        key: option.key,
                                        data: option.data,
                                        defaultSelect: option.defaultSelect,
                                        http: option.http,
                                        httpData: option.httpData,
                                        afterGetData: option.afterGetData,
                                        onClick: function (nodeData,depth) {
                                            $scope.selectData = nodeData;
                                            $scope.depth = depth;
                                        },
                                        afterCreate: function () {
                                            var that = this;
                                            var $nodes = that.boundingBox.find('.ui-tree-box-node');
                                            for (var i in option.defaultCheck.list) {
                                                $nodes.each(function () {
                                                    var id = $(this).parent().attr("id");
                                                    var depth = tree.idToDepth($(this).parent().parent().parent().attr("id"));
                                                    var data = that.getNodeDataByDepth(that.idToDepth(id));
                                                    if (data[option.defaultCheck.key] == option.defaultCheck.list[i]) {
                                                        $(this).click();
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }]
                            });
                        },
                        //弹出选择页 （左右两块区域多选：）
                        multipleSelect: function (data, callback) {
                            var option = {
                                title: "选择",
                                data: null,
                                key: null,
                                http: null,
                                httpData: null,
                                okText: '确定',
                                afterGetData: null,
                                isShowAction: true,         //设置左侧选中添加到右侧时，左侧中是否删除。默认为true
                                defaultCheck: {        //默认选中配置
                                    key: '',               //对应数据结构中的key
                                    list: []               //已选中的value的数组 一般为id数组
                                }
                            };
                            angular.extend(option, data);
                            option.treeData = angular.copy(data.treeData);
                            var dialog = this.confirm({
                                title: option.title,
                                size: {width: 600, height: 480},
                                templateUrl: 'module/ui/templates/dialogMultipleSelect.html',
                                okText: option.okText,
                                onConfirm: function (scope) {
                                    var res = [];
                                    for (var i in scope.rightList) {
                                        res.push(scope.rightList[i]['data']);
                                    }
                                    Log('----Dialog multipleSelect:----');
                                    Log(res);
                                    Log('----Dialog multipleSelect end----');
                                    callback && callback(res);
                                },
                                controller: ['$scope', 'batTreeView', function ($scope, batTreeView) {
                                    $scope.selectData = null;
                                    $scope.title = option.title;
                                    $scope.rightList = [];
                                    $scope.rightSelectIndex = null;
                                    $scope.key = option.key;
                                    $scope.leftSelect = null;

                                    $scope.addClick = function (obj) {
                                        var treeObj = tree;
                                        if (obj)
                                            treeObj = obj;
                                        if ($scope.leftSelect != null) {
                                            for (var i in $scope.rightList) {
                                                if ($scope.rightList[i]['data'] == $scope.leftSelect['data']) {
                                                    break;
                                                }
                                                if (i == $scope.rightList.length - 1)
                                                    $scope.rightList.push($scope.leftSelect);
                                            }
                                            if ($scope.rightList.length == 0) {
                                                $scope.rightList.push($scope.leftSelect);
                                            }
                                            if (option.isShowAction == true)
                                                treeObj.hideNodeByDepth($scope.leftSelect.depth);
                                            $scope.leftSelect = null;
                                            treeObj.setSelectByDepth(null);
                                        }
                                    };
                                    $scope.rightListClick = function (index) {
                                        console.log(index);
                                        $scope.rightSelectIndex = index;
                                    };
                                    $scope.removeClick = function () {
                                        if ($scope.rightSelectIndex != null) {
                                            if (option.isShowAction == true)
                                                tree.showNodeByDepth($scope.rightList[$scope.rightSelectIndex]['depth']);
                                            $scope.rightList.splice($scope.rightSelectIndex, 1);
                                            $scope.rightSelectIndex = null;
                                        }
                                    };
                                    $scope.addAllClick = function () {
                                        tree.boundingBox.find('.ui-tree-box-node').each(function () {
                                            $(this).click();
                                            $scope.addClick();
                                        })
                                    };
                                    $scope.removeAllClick = function () {
                                        for (var i in $scope.rightList) {
                                            if (option.isShowAction == true)
                                                tree.showNodeByDepth($scope.rightList[i]['depth']);
                                        }
                                        $scope.rightList = [];
                                    };

                                    console.info('-------------', option);
                                    var tree = batTreeView.create({
                                        parent: '#treeViewParent',
                                        key: option.key,
                                        data: option.data,
                                        defaultSelect: null,
                                        http: option.http,
                                        httpData: option.httpData,
                                        afterGetData: option.afterGetData,
                                        onClick: function (data, depth) {
                                            $scope.leftSelect = {
                                                data: data,
                                                depth: depth
                                            }
                                        },
                                        afterCreate: function () {
                                            var that = this;
                                            var $nodes = that.boundingBox.find('.ui-tree-box-node');
                                            for (var i in option.defaultCheck.list) {
                                                $nodes.each(function () {
                                                    var id = $(this).parent().attr("id");
                                                    var data = that.getNodeDataByDepth(that.idToDepth(id));
                                                    if (data[option.defaultCheck.key] == option.defaultCheck.list[i]) {
                                                        $(this).click();
                                                        //传入that（that为tree对象，因为当data参数不为空时，调用afterCreate函数时tree为未定义）
                                                        $scope.addClick(that);
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }]
                            });
                        },
                        //弹出选择页 （多选）
                        selectCheckBox: function (data, callback) {
                            var option = {
                                title: "选择",
                                data: null,
                                key: null,
                                http: null,
                                httpData: null,
                                okText: '确定',
                                afterGetData: null,
                                unableLevel: 0,         //根据深度设定该节点是否可以选中 1：深度为1的不能被选中，2:深度为1,2的不能被选中，默认为0，即所有可选
                                defaultCheck: {        //默认选中配置
                                    key: '',
                                    list: []
                                }
                            };
                            angular.extend(option, data);

                            var tree = null;

                            var dialog = this.confirm({
                                title: option.title,
                                size: {width: 350, height: 480},
                                templateUrl: 'module/ui/templates/dialogSelect.html',
                                okText: option.okText,
                                onConfirm: function (scope) {
                                    var selectData = [];
                                    tree.boundingBox.find('input').each(function () {
                                        if ($(this)[0].checked == true) {
                                            var depth = tree.idToDepth($(this).parent().parent().parent().attr("id"));
                                            var data = tree.getNodeDataByDepth(depth);
                                            selectData.push({
                                                depth: depth,
                                                data: data
                                            });
                                        }
                                    });
                                    console.log(selectData);
                                    callback && callback(selectData);
                                },
                                controller: ['$scope', 'batTreeView', function ($scope, batTreeView) {
                                    $scope.selectData = null;
                                    $scope.isShowCheckBox = "selectCheckBox";//只用多选出现ng-show
                                    $scope.isCheckAll = false;//初始不选
                                    $scope.checkAllChange = function(){ //控制全选
                                        tree.boundingBox.find('input').prop("checked", $scope.isCheckAll);
                                    };

                                    tree = batTreeView.create({
                                        parent: '#treeViewParent',
                                        key: option.key,
                                        data: option.data,
                                        defaultSelect: null,
                                        http: option.http,
                                        httpData: option.httpData,
                                        afterGetData: option.afterGetData,
                                        keyLoad: function (data, depth) {
                                            var $nodeContent = $("<div><input type='checkbox' style='vertical-align:middle; margin-top:0;' >&nbsp;" + data[option.key] + "</div>");
                                            if (depth.length <= option.unableLevel) {
                                                //$nodeContent.find('input').attr("disabled", "disabled");
                                                $nodeContent.find('input').css("display", "none");
                                            }
                                            $nodeContent.find('input').on('change', function () {
                                                //获取该checkbox的节点
                                                var $node = $(this).parent().parent().parent();

                                                if ($(this)[0].checked == true) {
                                                    $node.find('input').prop("checked", true);
                                                    //判断同级元素是否为选中，当同级元素为全选时，设定父节点选中
                                                    var h = 0;
                                                    $node.siblings().each(function () {
                                                        h += $(this).children('.ui-tree-box-node').find('input')[0].checked;
                                                    });
                                                    if ($node.siblings().length == h) {
                                                        var $parentInput = $node.parent().parent().children('.ui-tree-box-node').find('input');
                                                        $parentInput.prop("checked", true);
                                                        $parentInput.change();
                                                    }
                                                }
                                                else {
                                                    $node.find('input').prop("checked", false);
                                                    $node.parents().children('.ui-tree-box-node').find('input').prop("checked", false);
                                                }
                                            });
                                            return $nodeContent;
                                        },
                                        //当树结构创建完成后设置初始选中项
                                        afterCreate: function () {
                                            var $inputs = tree.boundingBox.find('input');
                                            for (var i in option.defaultCheck.list) {
                                                $inputs.each(function () {
                                                    var depth = tree.idToDepth($(this).parent().parent().parent().attr("id"));
                                                    var data = tree.getNodeDataByDepth(depth);
                                                    if (data[option.defaultCheck.key] == option.defaultCheck.list[i]) {
                                                        $(this).prop("checked", true);
                                                        $(this).change();
                                                        //break;
                                                    }
                                                });
                                            }
                                        },
                                        onClick: function (nodeData) {
                                        }
                                    });
                                }]
                            });
                        }
                    };

                    return publicMethods;
                }
            ]
        });

        //弹窗页的分页指令
        //该指令的scope作用域为父亲的作用域，即等于pagination中定义的作用域
        //所以该scope中定义的变量及函数与pagination中定义的是双向同步的

        m.directive('dialogPage', ['batDialog', function () {
            return {
                restrict: 'AE',
                transclude: true,
                replace: true,
                controller: function ($scope, error) {
                    var parent = $scope.$parent;
                    //存储每个页面
                    $scope._dPages = [];
                    //存储子页面的form名称
                    $scope.childFormNames = [];
                    //当前页面显示序号
                    parent._dShowIndex = 0;

                    //以下三个变量分别控制 下一步，上一步，确定按钮状态
                    parent._dNextDisable = false;
                    parent._dLastDisable = false;
                    parent._dConfirmDisable = true;
                    $scope._topConfirmDisable = false;//控制除新建状态下的 下一步上面导航是否Disabled
                    //设置当前按钮状态
                    function setButtonStatus() {
                        //只有新建状态匹配传入值addDisabled 最后一页完成才能点
                        if ($scope.okDisabled == "addDisabled") {
                            if (parent._dShowIndex == $scope._dPages.length - 1)
                                parent._dConfirmDisable = false;
                            else
                                parent._dConfirmDisable = true;
                        } else {
                            parent._dConfirmDisable = false;
                        }
                        //除新建状态下，下一步上面的导航控制是否Disabled
                        if (angular.isDefined($scope.okDisabled) == false || $scope.okDisabled == null ) {
                            $scope._topConfirmDisable = false
                        } else {
                            $scope._topConfirmDisable = true
                        }
                        console.info("_topConfirmDisable:",$scope._topConfirmDisable);
                        //..
                        if (parent._dShowIndex == 0)
                            parent._dLastDisable = true;
                        else
                            parent._dLastDisable = false;

                        if (parent._dShowIndex == $scope._dPages.length - 1)
                            parent._dNextDisable = true;
                        else
                            parent._dNextDisable = false;
                    }

                    setButtonStatus();

                    //添加页面
                    this.add = function (scope) {
                        $scope._dPages.push(scope);
                        $scope.childFormNames.push(scope.formName);

                        if ($scope._dPages.length == 1) {
                            $scope._dPages[0].isShow = true;
                        }
                    };
                    //点击切换页面
                    $scope._dPageClick = function (index) {
                        $scope.errorCode = null;
                        angular.forEach($scope._dPages, function (page) {
                            page.isShow = false;
                        });
                        parent._dShowIndex = index;
                        $scope._dPages[index].isShow = true;
                        setButtonStatus();
                    };
                    //下一步按钮事件
                    parent._dNextPage = function () {
                        $scope.errorCode = null;
                        if($scope._bat_validate){
                            if($scope._bat_validate($('.ui-dialog-each-page').eq(parent._dShowIndex)) == false){
                                return;
                            }
                        }
                        if (parent._dShowIndex < $scope._dPages.length - 1) {
                            if ($scope.onNextPage(parent._dShowIndex, $scope) == false)
                                return;
                            $scope._dPageClick(parent._dShowIndex + 1);
                        }

                    };
                    //上一步按钮事件
                    parent._dLastPage = function () {
                        $scope.errorCode = null;
                        if($scope._bat_validate){
                            if($scope._bat_validate($('.ui-dialog-each-page').eq(parent._dShowIndex)) == false){
                                return;
                            }
                        }
                        if (parent._dShowIndex > 0) {
                            $scope._dPageClick(parent._dShowIndex - 1);
                        }
                    }
                },
                template: "<div class='ui-dialog-page'>" +
                "<div class='ui-dialog-content-page-bar'>" +
                "<div ng-repeat='t in _dPages' class='ui-dialog-content-page-each'>" +
                "<button class='page-title' ng-click='_dPageClick($index)' ng-disabled='{{_topConfirmDisable}}'  ng-class='{showb:t.isShow}'>{{t.pageTitle}}</button>" +
                "<span ng-show='$index != _dPages.length-1'>></span>" +
                "</div>" +
                    //"<div ng-repeat='t in _dPages' class='ui-dialog-content-page-each'><span class='page-title' ng-click='_dPageClick($index)' ng-class='{showb:t.isShow}'>{{t.pageTitle}}</sp><span ng-show='$index != _dPages.length-1'>></span></div>" +
                    //"<div ng-repeat='t in _dPages' class='ui-dialog-content-page-each'><span class='page-title' ng-class='{showb:t.isShow}'>{{t.pageTitle}}</span><span ng-show='$index != _dPages.length-1'>></span></div>" +
                "</div>" +
                "</div>",
                link: function (scope, element, attrs, ctrl, transclude) {
                    //替换transclude的scope为ctrl的scope


                    transclude(scope, function (clone, scope) {
                        element.append(clone);
                    });
                }
            }
        }
        ])
        ;
        m.directive('dialogPagePanel', function () {
            return {
                restrict: 'AE',
                require: '^dialogPage',
                transclude: true,
                replace: true,
                scope: {
                    pageTitle: '@'
                },
                template: function (element, attr) {
                    var name = 'childForm' + Math.ceil(Math.random() * 100000000000);
                    return '<ng-form class="ui-dialog-each-page" ng-show="isShow" name="' + name + '"></ng-form>';
                },
                link: function (scope, element, attrs, ctrl, transclude) {
                    scope.isShow = false;
                    scope.pageTitle = attrs.pageTitle;
                    scope.formName = attrs.name;

                    ctrl.add(scope);

                    //替换transclude的scope为ctrl的scope
                    transclude(scope.$parent, function (clone, scope) {
                        element.append(clone);
                    });
                }
            }
        });
        return m;
    })
)
;