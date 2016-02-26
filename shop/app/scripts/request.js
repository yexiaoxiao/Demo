'use strict';

var request = angular.module('Request', []);

request.factory("request", ['$http', 'batDialog',
        function($http, batDialog){

            //请求函数名定义及请求url
            var _config = {
                messageList: "/data/messageList.json",
                eventhistorybytime: "/data/eventhistorybytime.json",
                eventhistorybytime2: "/data/eventhistorybytime2.json",
                guideClick: "/data/guide.json",
                getCookie: "/data/cookie.json",
                //人员设置模块获取部门
                AssetGetDepartment : "/asset/get/department",
                AssetGetDepartmentTree : "/asset/get/departmenttree",
                PersonGetGroup : "/person/get/group",                     //人员设置模块获取组
                PersonGetKeshi  :"/person/get/keshi" ,
                PersonGetPersons : "/person/search/person",                //获取所有人员
                PersonGetPersonsById : "/person/getpersonbyid",                  //根据人员id获取人员详细信息
                //AssetGetAssetsByDepartment : "/asset/get/assetbydepartmentids", //按部门id查询人员
                //AssetGetAssetsByGroupID : "/asset/get/assetbygroupids", //按组id查询人员
                PersonAddPerson : "/person/add/person",                     //添加人员
                PersonUpdatePerson : "/person/update/person",               //跟新人员
                PersonDelPersons : "/person/delete/person",               //删除人员集合
                //AssetAddDepartment : "/asset/add/department",           //人员模块添加部门
                //AssetUpdateDepartment : "/asset/update/department",     //人员模块更新部门
                //AssetDelDepartment : "/asset/delete/department",        //人员模块更新部门
                PersonAddGroup : "/person/add/group",                     //添加组
                PersonCopyGroup : '/person/copy/group',                   //复制组
                PersonUpdateGroup : "/person/update/group",               //编辑组
                PersonDelGroup : "/person/delete/group",                  //删除组
                PersonGetTagsById : "/person/get/assettags",              //查询人员绑定的Tag
                PersonGetUnbindingTags : "/person/get/unbindingTags",     //获取所有未绑定人员的tag
                PersonBindTags:                   "/person/bindingtags",
                PersonGetBindingTags : "/person/get/assettags",          //查询人员绑定的Tag
                PersonGetPersonStatus : "/person/get/assetstatus",        //获取所有的人员状态
                PersonActivatePerson : '/person/activateasset',           //人员激活操作
                PersonSearch : '/person/search/person',                    //人员搜索
                //AssetGetDepartmentCount: '/person/get/deptassetcount',    //	部门及其子部门下人员的个数
                PersonGetGroupCount:'/person/get/grouppersoncount',                  //组下面人员的个数
                PersonBingingGroup: '/person/add/groupBinding',               //将人员资格分配到每一个组
                PersonUpdatePersonImg:'/person/update/personimg',         //人员图片更改


                EventAddEvent : "/eventManager/add/event",              //添加事件
                EventUpdateEvent : "/eventManager/update/event",        //更新事件
                EventDelEvent : "/eventManager/delete/events",          //删除事件
                EventGetGroups : "/eventManager/get/groups",            //获取事件组
                EventGetEvents : "/eventManager/get/events",             //获取事件
                EventGetEvent : "/eventManager/get/event",           //根据事件id获取事件
                EventGetEventById : "/eventManager/get/event",          //根据事件id获取事件
                EventGetTemplates : "/eventManager/get/templates",      //获取事件模板
                EventGetMessageTemplateList : "/eventManager/get/messageTemplate/list",     //获取消息模版列表
                EventEnableEvents : "/eventManager/enable/events",      //启用事件
                EventDisableEvents : "/eventManager/disable/events",    //停用事件
                EventGetAudio : '/eventManager/get/alert/audios',        //获取报警声音列表


                TagGetAllTag : "/tag/getCurrentPageTags", //获取全部标签
                TagAddTag : "/tag/addTag", //增加标签
                TagUpdateTag : "/tag/updateTag",//更新标签
                TagBindingAsset : "/tag/bindingPerson",// 标签签与人员绑定
                TagUnbindingAsset:"/tag/unBindingPerson",//标签签与人员解除绑定
                TagDelTags : "/tag/deleteTags",// 删除标签（一个或多个）
                //TagSearchAsset:"/tag/searchAsset",//标签绑定时检索人员
                TagSearchAsset:"/person/search/person",//标签绑定时检索人员
                TagGetTagById : "/tag/getTag",      //根据标签id获取标签


                MapGetMapTree : "/map/getMapSetting",
                MapGetMapAreaZoneTree : "/map/getAreaZoneTree",
                MapGetZoneTreeWithConvict : "/map/getAreaZoneTreeWithConvict",
                MapGetMapSizeByID : "/map/getMapWidthHeight",
                MapGetMapPathByID : "/map/getMapFullPath",
                MapGetZoneByID : "/map/getZonesPointsByMapId",
                MapGetUsefulMaps : "/map/getUsefulMaps",
                MapGetUnAssignedMaps : "/map/getUnAssignedMaps",        //获取未分配地图
                MapGetAssignedMaps : "/map/getAssignedMaps",        //获取已分配地图
                MapSetMapSetting : "/map/setMapSetting",
                MapGetMapFullPath : "/map/getMapFullPath",              //获取地图http路径
                MapGetZonesPointsByMapId : "/map/getZonesPointsByMapId",    //根据地图id获取地图上的路径
                MapGetExcitersOfCurrentMap : '/map/getExcitersOfCurrentMap', //获取当前地图所有触发器
                MapAddZone : "/map/addZone",                            //添加区域
                MapUpdateZone : "/map/updateZone",                      //跟新区域
                MapDelZone : "/map/deleteZone",                         //删除区域
                MapMoveZone : "/map/moveZone",                          //移动区域
                MapAddZonePoint : "/map/addZonePoint",                  //添加区域节点
                MapDelZonePoint : "/map/deleteZonePoint",               //删除区域节点
                MapDelArea : "/map/deleteArea",                         //删除区域
                MapGetZoneDataById : '/map/getZone',                //根据分区id获取分区                  '/map/getMapByZoneId',
                MapGetMapByZoneId :  '/map/getMapByZoneId',         //跟前zoneid获取地图信息

                MapGetZoneType : "/systemSetting/getZoneType",                    //获取区域类型
                MapSetZoneType : '/map/setZoneType',                    //更新区域id
                MapGetZoneBusinessStatus : '/systemSetting/getZoneBusinessStatus',    //获取分区业务状态
                MapAddArea : "/map/addArea",                            //添加场所
                MapAddBuilding : "/map/addBuilding",                    //添加建筑
                MapAddFloor : "/map/addFloor",                          //添加楼层
                MapUpdateArea : "/map/updateArea",                      //更新区域
                MapHideAreasOfUnbindingMap : "/map/hideAreasOfUnbindingMap",    //隐藏未绑定地图的楼层
                MapShowAreasOfUnbindingMap : "/map/showAreasOfUnbindingMap",    //显示未绑定地图的楼层
                MapGetAreaBindingDepartments : '/map/getAreaBindingDepartments',     //获取地图已绑定的部门
                MapSetAreaBindingDepartments : '/map/setAreaBindingDepartments',    //设置与该area id绑定的部门ids
                MapGetAllExciters : '/map/getAllExciters',                    //获取所有触发器
                MapGetAreaHideStatus : '/map/getAreaHideStatus',        //获取区域隐藏状态
                equipmentIPCameraGet :'/equipment/IPCamera/get',    //获取摄像机
                equipmentIPCameraSet : '/equipment/IPCamera/set',   //编辑添加摄像机
                equipmentIPCamerasDel :'/equipment/IPCamera/delete',   // 删除摄像机
                equipmentIPCamerasAll : '/equipment/IPDisk/get/all', //获取全部摄像头
                equipmentIPCamerasById:'/equipment/IPCamera/get',   //根据ID获取摄像头信息


                LocationGetAllTagsByZone : "/location/getCurrentAreaAllTags",   //根据区域id获取Tag


                LocationGetByDepartmentId: "/department/getdepartmentarea",   //根据部门Id获取区域
                DepartmentIdBindAsset:"/department/assetdeptchange",//部门ID绑定人员
                DepartmentIdBindArea:  "/department/deptareachange",//部门ID绑定区域
                GetAllDepartmentAreaId:"/department/getalldepartmentarea",//获取所有部门绑定的区域
                DepartmentSearchAsset:"/department/assetsearch",//部门中按条件查询人员


                AllGetAlarm:"/alertManager/get/alerts",//获取所有报警
                AddAlarm:"/alertManager/handle/alerts",//报警待定
                RemoveAlarm:"/alertManager/remove/alerts",//报警解除
                DelAlarm:"/alertManager/delete/alerts",//删除报警
                ManagerAlarm: "/alertManager/get",//按id获取详细报警信息
                AllDataHistoryAlarmCSV:'/eventHistory/altersCsvIn',//历史报警导出
                equipmentVideoGet: '/equipment/video/get',//	按事件ID获取录像文件



                UserUnlockRole:"/userManager/activityUser",//激活管理员
                UserLockRole:"/userManager/inactivityUser",//取消激活管理员
                UserAddUser:"/userManager/addUser",    //添加用户
                UserUpdateUser:"/userManager/updateUser",//编辑用户
                UserGetAllUser :"/userManager/getAllUser",//获取用户
                UserDelUser:"/userManager/deleteUser",//删除用户
                UserGetRole:"/userManager/getAllRole",//用户模块获取角色
                RoleAddRole:"/userManager/addRole",//添加角色
                RoleGetAllRole:"/userManager/getAllRole",//获取所有角色
                RoleUpdateRole:"/userManager/updateRole",//编辑角色
                RoleDelRole:"/userManager/deleteRole/",//删除角色
                RoleGetAllPermission : '/userManager/getAllPermission',  //获取用户所有权限
                RoleGetSearchRole:'/userManager/getSearchRole',
                RoleGetPermission:'/userManager/getRolePermission',//获取用户未选择权限
                UserSearchUser:'/userManager/getSearchUser',//获取用户已选择的角色
                UserGetSelectedRole:'/userManager/getUserRole',
                UserGetById:'/userManager/getUserById', //根据id获取详细管理员
                UserSignIn: '/data/sign.json',//用户登录
                UserSignOut: '/loginManager/loginOut',//用户退出
                UserGetLoginInfo: '/loginManager/loginInfo',//获取当前用户信息
                UserResetPassword: '/userManager/updatePassword',//重置用户密码

                ValidateRepeat:'/validate/repeat',//远程校验


                SystemGetSummary:'/systemSetting/get/summary',//系统获取系统的所有统计
                SystemSetGeneral:'/systemSetting/set/general',//系统设置常规属性
                SystemSetEmail:'/systemSetting/set/email',//系统设置email
                SystemTestEmail:'/systemSetting/test/email',//系统发送测试email
                SystemSetEvent:'/systemSetting/set/event',//系统设置事件
                SystemGetEvent:'/systemSetting/get/event',//获取事件设置
                SystemGetAssetStatuses:'/systemSetting/get/assetStatuses',//系统获取人员状态
                SystemSetAssetStatuses: '/systemSetting/set/assetStatuses',//系统设置人员状态
                SystemGetAreaType: '/systemSetting/getZoneType',//系统获取分区类型
                SystemSetAreaType: '/systemSetting/setZoneType',//系统设置分区类型
                SystemGetAreaStatuses: '/systemSetting/getZoneBusinessStatus',//系统获取分区状态
                SystemSetAreaStatuses: '/systemSetting/setZoneBusinessStatus',//系统设置分区状态
                SystemSetQueryAllOffices: '/systemSetting/queryAllOffices',//查询科室
                SystemSetAddOffices: '/systemSetting/addOffices',//添加科室
                SystemSetUpdateOffices: '/systemSetting/updateOffices',//更新科室
                SystemSetDeleteOffices: '/systemSetting/deleteOffices',//删除科室
                SystemSetIsExistInPersonWithOffices: '/systemSetting/isExistInPersonWithOffices',//科室是否能删除
                SystemSetQueryAllPosition: '/systemSetting/queryAllPosition',//查询职位
                SystemSetAddPosition: '/systemSetting/addPosition',//添加职位
                SystemSetUpdatePosition: '/systemSetting/updatePosition',//更新职位
                SystemSetDeletePosition: '/systemSetting/deletePosition',//删除职位
                SystemSetIsExistInPersonWithPosition: '/systemSetting/isExistInPersonWithPosition',//职位是否能删除
                //系统设置硬盘摄像机 Nvr
                equipmentIPDiskGet  :'/equipment/IPDisk/get/page',   //获取设置NVr 分页
                equipmentIPDiskSet  : '/equipment/IPDisk/set',  //设置 编辑&添加Nvr
                equipmentIPDiskDel : '/equipment/IPDisk/delete' ,   // 删除设置   Nvr

                LocationGetAllSaveSearch : '/location/getAllSavedSearch',       //获取收藏夹内的列表
                LocationSearch : '/location/searchAllItem',                     //搜索
                LocationSaveSearch : '/location/saveSearchResult',              //保存收藏结果
                LocationDelSaveSearch : '/location/deleteSearchResult',             //删除收藏结果
                LocationGetData : '/location',                                  //获取收藏结果
                LocationGetSearchType : '/location/getSerchItemTypeEnum',       //获取搜索类型
                LocationGetPathChild : '/location/getMapsOfChileArea',          //根据点击的区域节点，获取分类数据
                LocationRefreshLocation : '/location/realtimeLocation',         //实时定位
                LocationGetMapByEvent : '/location/getEventMapLocation',         //根据事件获取指定的地图上的定位信息

                //cell
                LocationGetAllAreaMapsForIndex : '/location/getAllAreaMapsForIndex',    //获取首页需显示的所有地图
                LocationGetSpecificArea : '/location/getSpecificArea',          //获取特定的区域地图信息
                LocationGetSpecificMapLocation : '/location/getSpecificMapLocation',    //获取指定的地图上的定位信息
                LocationGetHistoryTrackList : '/location/getHistoryTrackList',      //获取历史轨迹追踪，列表显示
                LocationCount : '/location/getTotalPerson',                     //点名
                LocationRefreshPoints : '/location/getSpecificMapLocationRealTime',     //主页的点的刷新

                //临时授权
                EmpowerGetAllEmpower : "/empowerManager/getSearchEmpower", //获取全部授权
                EmpowerAddEmpower : "/empowerManager/addEmpower", //增加授权
                EmpowerUpdateEmpower : "/empowerManager/updateEmpower",//更新授权
                EmpowerDelEmpowers : "/empowerManager/deleteEmpower",// 删除授权（一个或多个）
                EmpowerGetSearchPerson:"/empowerManager/getSearchPerson",//授权多个人员
                EmpowerGetAllZoneTree: "/empowerManager/getAllZoneTree", //获取全部区域

                //报告
                ReportDataHistoryCVS :'/eventHistory/eventHistoryCsvIn',
                ReportDataHistoryPDF : '/eventHistory/eventHistoryPdf',
                ReportDataBatteryCVS : '/batteryLevel/batteryLevelCsvIn',
                ReportDataBatteryPDF : '/batteryLevel/batteryLevelPdf',

               // ReportHistoryTrackCsv : '/historicalTrack/historicalTrackCsvIn',




                //测试请求
                Test : "/test"
            };


            //添加等待框
            var $loading = $("<div class='loading'><div class='loading-bg'></div></div>");
            $('body').append($loading);
            $loading.hide();
            var httpCount = 0;


            function Ajax(url){
                //_data : 请求的数据
                //_callback : 回调函数
                //_type : 请求类型，默认以json传递，如果为param，则传输数据为序列化
                this.req = function(_data, _callback, _config, _param){
                    var obj;
                    var def = {
                        isShowLoading : true
                    };
                    _config = angular.extend(def, _config || {});
                    //if(_type == 'param'){
                    //    if(_data)
                    //        _data = $.param(_data);
                    //    obj = {
                    //        data : _data ,
                    //        method : "post",
                    //        url : url,
                    //        headers : {
                    //            'Content-Type' :  "application/x-www-form-urlencoded; charset=utf-8"
                    //        }
                    //    }
                    //}
                    obj = {
                        data : _data,
                        method : "get",
                        url : url
                    };
                    httpCount += 1;
                    if(_config.isShowLoading == true)
                        $loading.show();

                    return $http(obj).success(function(data, status, headers, config) {
                        httpCount -= 1;
                        if(httpCount == 0){
                            $loading.fadeOut(200);
                        }
                        if( data == '2' ){ //TODO
                            console.log('未登录');
                            return;
                        }
                        _callback && _callback(data, status, headers, config, _param);
                    }).error(function(){
                        httpCount -= 1;
                        if(httpCount == 0){
                            $loading.fadeOut(200);
                        }
                        batDialog.alert('数据请求失败，请重试。');
                    })
                };
            }

            var pathName=window.document.location.pathname;
            var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
            var res = {};


            for(var s in _config)
            {
                var t = new Ajax( projectName + _config[s]);
                res[s] = t.req;
            }

            return res;
        }]
);