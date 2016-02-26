'use strict';

var uiService = angular.module('UIService', []);

//事件初始数据
uiService.factory('OriginalEventData', function () {
    return {
        "0": { //常规数据
            "event_spec_status": 1,                            //描述事件启用状态
            "assignment_type": "ASSET",                        //留用
            "event_spec_description": "",                      //对此事件定义作用等的说明性描述
            "event_spec_name": "",                             //事件名称
            "always_active": true,
            "reset_interval": 0,                             //免打扰间隔时长
            "event_group": "事件组1",
            "corrective_instructions": "",                      //备注
            "event_spec_priority": 1,                           //事件优先级 默认中
            "non_displayed": false,                             //是否在报警板块中显示 默认为0 显示，checkbox不打勾
            "event_spec_template_holder": {
                "event_template_id": ""
            },
            "detection_parameters_view": {                   //作用对象及事件条件
            },
            "alert_spec_view_set": [                               //动作
            ],
            "schedules": [                                  //计划
            ]
        },
        "1": {//呼叫按钮
            "Object": {
                //"allAssets": "true",                         //所有人员
                //"categoryIds": "",                       //作用对象 选择 部门Id
                //"categoryIds_name": "",                   //作用对象 选择 部门名字
                "groupIds": "",                          //作用对象 选择 组Id
                "groupIds_name": "",                       //作用对象 选择 组名字
                "assetIds": "",                          //作用对象 选择 人员ID
                "assetIds_name": "",                       //作用对象 选择 人员名字
                //"validateAssetBusinessStatus": "false",      //作用对象 根据人员状态选择
                //"assetBusinessStatusIds": "",          //作用对象 状态ID
                //"assetBusinessStatusIds_name": ""        //作用对象 状态名称
                "assetsChoose": 0 //所有人员
            },
            "Condition": {
                "checkMessage": "false",                     //事件条件 是否验证
                "messageNumbers": "",                    //事件条件 消息编码
                "substring": "",                         //事件条件 消息内容
                "withLocation": 0,                       //事件条件 位置
                "areas": "",                           //事件条件 位置 区域 ID
                "areas_name": "",                      //事件条件 位置 区域 名字
                "zones": "",                           //事件条件 位置 分区ID
                "zones_name": ""                          //事件条件 位置 分区name
                //"zones_name": "",                      //事件条件 位置 分区名字
                //  "validateZoneType": "false",               //事件条件 分区类型
                // "zoneTypes": "",                         //事件条件 分区类型 ID
                // "zoneTypes_name": "",                       //事件条件 分区类型 名字
                // "validateZoneBusinessStatus": "false",        //事件条件 分区状态
                // "zoneBusinessStatuses": "",                  //事件条件 分区状态ID
                //"zoneBusinessStatuses_name": "",              //事件条件 分区状态 名字
                // "exciters": "",                             //事件条件 触发器ID
                // "exciters_name": ""                          //事件条件 触发器 名字

            }
        },
        "2": {//标签消失
            "Object": {
                //"allAssets": "true",                         //所有人员
                //"categoryIds": "",                       //作用对象 选择 部门Id
                //"categoryIds_name": "",                   //作用对象 选择 部门名字
                //"groupIds": "",                          //作用对象 选择 组Id
                //"groupIds_name": "",                       //作用对象 选择 组名字
                //"assetIds": "",                          //作用对象 选择 人员ID
                //"assetIds_name": "",                       //作用对象 选择 人员名字
                //"validateAssetBusinessStatus": "false",      //作用对象 根据人员状态选择
                //"assetBusinessStatusIds": "",          //作用对象 状态ID
                //"assetBusinessStatusIds_name": ""        //作用对象 状态名称
                "assetsChoose": 0 //所有人员
            },
            "Condition": {
                "withLocation": 0,
                "days": "0", //天
                "hours": "0", // 小时
                "minutes": "0", // 分钟
                "seconds": "0", // 秒
                "checkRemindTime": "false",  // 周期状态
                "remindTime": 1  // 周期分钟
            }
        },
        "3": {//电池电量
            "Object": {
                //"allAssets": "true",                         //所有人员
                "assetsChoose": 0,                              //所有人员
                //"categoryIds": "",                       //作用对象 选择 部门Id
                //"categoryIds_name": "",                   //作用对象 选择 部门名字
                "groupIds": "",                          //作用对象 选择 组Id
                "groupIds_name": "",                       //作用对象 选择 组名字
                "assetIds": "",                          //作用对象 选择 人员ID
                "assetIds_name": ""                     //作用对象 选择 人员名字
                // "validateAssetBusinessStatus": "false",      //作用对象 根据人员状态选择
                // "assetBusinessStatusIds": "",          //作用对象 状态ID
                //"assetBusinessStatusIds_name": ""        //作用对象 状态名称
            },
            "Condition": {
                "withLocation": 0,
                "batteryStatus": '1'
            }
        },
        "4": {
            "Object": {
                "allExciters": "true",
                "areas":  "",
                "areas_name": "",
                "exciters": "",
                "exciters_name": ""
            },
            "Condition": {
                "withLocation": 0,
                "days": "0", //天
                "hours": "0", // 小时
                "minutes": "0", // 分钟
                "seconds": "0" // 秒

            }
        }
        /* "4": {//停止
         "Object": {
         "assetsChoose": 0,
         "groupIds": "",                          //作用对象 选择 组Id
         "groupIds_name": "",                       //作用对象 选择 组名字
         "assetIds": "",                          //作用对象 选择 人员ID
         "assetIds_name": ""                     //作用对象 选择 人员名字
         },
         "Condition": {
         "withLocation": null,                          //事件条件 位置
         "areas": "",                           //事件条件 位置 区域 ID
         "areas_name": "",                      //事件条件 位置 区域 名字
         "zones": "",                           //事件条件 位置 分区ID
         "zones_name": "",                      //事件条件 位置 分区名字
         //  "validateZoneType": "false",               //事件条件 分区类型
         "zoneTypes": "",                         //事件条件 分区类型 ID
         "zoneTypes_name": "",                       //事件条件 分区类型 名字
         // "validateZoneBusinessStatus": "false",        //事件条件 分区状态
         "zoneBusinessStatuses": "",                  //事件条件 分区状态ID
         "zoneBusinessStatuses_name": "",              //事件条件 分区状态 名字
         "exciters": "",                             //事件条件 触发器ID
         "exciters_name": "" ,                         //事件条件 触发器 名字
         "days": "0", //天
         "hours": "0", // 小时
         "minutes": "0", // 分钟
         "seconds": "0", // 秒
         "checkRemindTime": "false",  // 周期状态
         "remindTime": 1  // 周期分钟
         }
         },*/
        /*"5": {
         "Object": {
         "assetsChoose": 0,
         "groupIds": "",                          //作用对象 选择 组Id
         "groupIds_name": "",                       //作用对象 选择 组名字
         "assetIds": "",                          //作用对象 选择 人员ID
         "assetIds_name": ""                     //作用对象 选择 人员名字
         },
         "Condition": {
         "withLocation":null,                          //事件条件 位置
         "areas": "",                           //事件条件 位置 区域 ID
         "areas_name": "",                      //事件条件 位置 区域 名字
         "zones": "",                           //事件条件 位置 分区ID
         "zones_name": "",                      //事件条件 位置 分区名字
         //  "validateZoneType": "false",               //事件条件 分区类型
         "zoneTypes": "",                         //事件条件 分区类型 ID
         "zoneTypes_name": "",                       //事件条件 分区类型 名字
         // "validateZoneBusinessStatus": "false",        //事件条件 分区状态
         "zoneBusinessStatuses": "",                  //事件条件 分区状态ID
         "zoneBusinessStatuses_name": "",              //事件条件 分区状态 名字
         "exciters": "",                             //事件条件 触发器ID
         "exciters_name": "" ,                         //事件条件 触发器 名字
         "days": "0", //天
         "hours": "0", // 小时
         "minutes": "0", // 分钟
         "seconds": "0", // 秒
         "checkRemindTime": "false",  // 周期状态
         "remindTime": 1  // 周期分钟
         }
         },*/
        /* "6": {
         "Object": {
         "assetsChoose": 0,
         "groupIds": "",                          //作用对象 选择 组Id
         "groupIds_name": "",                       //作用对象 选择 组名字
         "assetIds": "",                          //作用对象 选择 人员ID
         "assetIds_name": ""                     //作用对象 选择 人员名字
         },
         "Condition": {
         "withLocation": null,                          //事件条件 位置
         "areas": "",                           //事件条件 位置 区域 ID
         "areas_name": "",                      //事件条件 位置 区域 名字
         "zones": "",                           //事件条件 位置 分区ID
         "zones_name": "",                      //事件条件 位置 分区名字
         //"validateZoneType": "false",               //事件条件 分区类型
         "zoneTypes": "",                         //事件条件 分区类型 ID
         "zoneTypes_name": "",                       //事件条件 分区类型 名字
         //"validateZoneBusinessStatus": "false",        //事件条件 分区状态
         "zoneBusinessStatuses": "",                  //事件条件 分区状态ID
         "zoneBusinessStatuses_name": "",              //事件条件 分区状态 名字
         "exciters": "",                             //事件条件 触发器ID
         "exciters_name": "" ,                         //事件条件 触发器 名字
         "checkRemindTime": "false",  // 周期状态
         "remindTime": 1  // 周期分钟
         }
         }*/
    };

});


//errorCode定义
uiService.service('error', function () {
    //定义错误类型
    this.type = {
        min: 1,
        max: 2,
        minlength: 3,
        maxlength: 4,
        required: 5,
        pattern: 6,
        romoteuniquecheck: 7,
        url: 8,
        email: 9,
        number: 10
    };
    //定义错误代码
    this.code = {
        //事件前端
        '43001': '事件名称不能为空！',
        '43002': '已存在相同事件名称！',
        '43003': '免打扰间隔不能为空！',
        '43004': '只能输入0-9999之间的四位整数！',
        '43005': '消息编号不正确！',
        '43006': '消息内容不正确！',
        '43007': '区域不能为空！',
        '43008': '分区不能为空！',
        '43009': '触发器不能为空！',
        '43010': '分区类型不能为空！',
        '43011': '分区状态不能为空！',
        '43012': 'URL不能为空',
        '43013': '输入格式不正确',
        '43014': '用户名不能为空！',
        '43015': '用户名不能超过30位',
        '43016': '密码不能为空！',
        '43017': '邮箱地址不能为空！',
        '43018': '邮箱地址不正确！',
        '43019': '消息内容输入过长',
        '43020': '消息编号输入过长',
        '43021': '请选择人员状态！',
        '43022': '请选择作用对象！',
        '43023': '事件条件>验证编号验证内容不能同时为空',
        '43024': '起始时间不能大于等于结束时间',
        '43025': '请选择分区类型！',
        '43026': '请选择分区状态！',
        '43027': '请选择区域位置！',
        '43028': '请选择分区位置！',
        '43029': '提醒周期数不能为空！',
        '43030': '人员停止报告其位置的时间不能都为0！',
        '43031': '请选择触发器！',
        '43032': '请选择位置！',


        //事件后端
        '439101': '作用对象>部门被移除，请检查',
        '439102': '作用对象>科室被移除，请检查',
        '439103': '作用对象>人员被移除，请检查',
        '439104': '作用对象>人员状态被移除，请检查',
        '430101': '事件条件>区域被移除，请检查',
        '430102': '事件条件>分区被移除，请检查',
        '430103': '事件条件>触发器被移除，请检查',
        '430104': '事件条件>分区类型被移除，请检查',
        '439105': '事件条件>分区状态被移除，请检查',

        //'439105': '事件条件>分区类型被移除，请检查',
        '439106': '作用对象>触发器被移除，请检查',


        '439201': '动作>更新分区属性>分区被移除，请检查',
        '439202': '动作>更新分区属性>分区类型被移除，请检查',
        '439203': '动作>更新分区属性>分区状态被移除，请检查',
        '439204': '动作>即时通知信息>管理员被移除，请检查',

        //人员前端
        '41001': '工号不能为空！',
        '41002': '已存在相同工号！',
        '41003': '部门不能为空！',
        '41004': '地图不能为空！',
        '41005': '填-100到100数字！',
        '41006': '温度不能为空！',
        '41007': '输入一位小数！',
        '41008': '湿度不能为空！',
        '41009': '输入0-100整数！',
        '41010': '温度>自定义温度不能为空',
        '41011': '温度>允许最低温度不能高于允许最高温度',
        '41012': '温度>设置报警范围>低温度不能高于高温度',
        '41013': '温度>设置报警范围>报警范围最低温度不能低于允许最低温度',
        '41014': '温度>设置报警范围>报警范围最高温度不能高于允许最高温度',
        '41015': '温度>设置报警范围>报警范围不能有重复区间',
        '41016': '湿度>自定义湿度不能为空',
        '41017': '湿度>允许最小湿度不能大于允许最大湿度',
        '41018': '湿度>设置报警范围>低湿度不能大于高湿度',
        '41019': '湿度>设置报警范围>报警范围最小湿度不能小于允许最小湿度',
        '41020': '湿度>设置报警范围>报警范围最大湿度不能大于允许最大湿度',
        '41021': '湿度>设置报警范围>报警范围不能有重复区间',
        '41022': '组名不能为空！',
        '41023': '组名不正确！',
        '41024': '已存在相同组名称！',
        '41025': '姓名不能为空！',
        '41026': '手机号码不能为空！',
        '41027': '工号长度不能超过10位！',
        '41028': '姓名长度不能超过30位！',


        //人员后端
        //...

        //标签前端
        '42001': 'MAC地址不能为空！',
        '42002': 'MAC地址不正确！',

        //管理员前端
        '45001': '用户名不能为空！',
        '45002': '已存在相同用户名！',
        '45003': '密码不能为空！',
        '45004': '密码至少3位！',
        '45005': '确认密码不能为空！',
        '45006': '确认密码不正确！',
        '45007': '手机号码不正确！',
        '45008': '邮箱地址不正确！',
        '45009': '至少选择一个角色！',
        '45010': '角色名不能为空！',
        '45011': '已存在相同角色名！',
        '45012': '角色>权限不能为空',

        //地图前端
        '46001': '场所名称不能重复',
        '46002': '建筑名称不能重复',

        //部门前端
        '47001': '部门名称不能为空！',
        '47002': '已存在相同部门名！',
        '47003': '部门描述不能超过512个字符',

        //系统前端
        '44001': '登出时间不正确！',
        '44002': '输入格式不正确！',
        '44003': 'URL不能为空！',
        '44004': '邮箱地址不能为空！',
        '44005': '邮箱格式不正确！',
        '44006': 'SMTP服务器端口不能为空！',
        '44007': 'SMTP服务器端口不正确！',
        '44008': '已存在相同的名称！',
        '44009': '科室名不能为空',
        '44010': '已存在相同科室名',
        '44011': '职位不能为空',
        '44012': '已存在相同职位',

        //
        '101': '值太小',
        '102': '值太大',
        '103': '长度过短',
        '104': '长度过长',
        '105': '请填写此字段',
        '106': '不符合规则',
        '107': '已存在相同名称的字段',
        '108': '输入格式不正确！',
        '109': '邮箱格式不正确！',
        '110': '请输入数值！',

        '111': '人员编号不能为空！',
        '112': '已存在相同人员编号！',
        '113': '部门不能为空！',
        '114': '地图不能为空！',
        '115': '温度不能为空！',
        '116': '填-100到100数字！',
        '117': '温度不能为空！',
        '118': '湿度不能为空！',
        '119': '湿度不能为空！',
        '120': '已存在相同用户名！',
        '121': '用户名不能为空！',
        '122': '密码不能为空！',
        '123': '手机号码不正确！',
        '124': '邮箱地址不正确！',
        '125': '至少选择一个角色！',
        '126': '角色名不能为空！',
        '127': '已存在相同角色名！',
        '128': 'MAC地址不能为空！',
        '129': 'MAC地址不正确！',
        '130': '部门名称不能为空！',
        '131': '已存在相同部门名！',
        '132': '事件名称不能为空！',
        '133': '已存在相同事件名称！',
        '134': '免打扰间隔不能为空！',
        '135': '只能输入0-9999之间的四位整数！',
        '136': '消息编号不正确！',
        '137': '消息内容不正确！',
        '138': '区域不能为空！',
        '139': '分区不能为空！',
        '140': '触发器不能为空！',
        '141': '分区类型不能为空！',
        '142': '分区状态不能为空！',
        '143': 'URL不能为空！',
        '144': '用户名不能为空！',
        '145': '密码不能为空！',
        '146': '邮箱地址不能为空！',
        '147': '场所名称不能为空！',
        '148': '组名不能为空！',
        '149': '组名不正确！',
        '150': '已存在相同组名称！',
        '151': 'SMTP服务器端口不能为空！',
        '152': 'SMTP服务器端口不正确！',
        '153': '登出时间不正确！',
        '154': '确认密码不能为空！',
        '155': '密码至少3位！',
        '156': '确认密码不正确！',
        '157': '输入一位小数！',
        '158': '输入0-100整数！',
        '159': '消息内容输入过长',
        '160': '消息编号输入过长',
        '161': '用户名不能超过30位',
        '162': '起始时间不能为空！',
        '163': '结束时间不能为空！',
        '164': '授权位置不能为空！',
        '165': '授权人员不能为空！',
        '166': 'IP格式不正确！',
        '167': '端口号不正确！',
        '168': 'NVR设备名称不能为空！',
        '169': '建筑名称不能为空！',
        '170': '楼面名称不能为空！',
        '171': '区域名称不能为空！',
        '172': '分区名称不能为空！',
        '173': '新建外设位置不能为空！',
        '174': '新建外设名称不能为空！',
        '175': '编辑地图区域名称不能为空！',
        '176': '科室不能为空！'
    };
    return this
});


uiService.service('cameraDialog', function () {
    //定义错误代码
    this.alert = function(camera){
        console.log(camera);
        //window.open('camera.html?ip='+ c['ip'] +'&port='+ c['port'] + '&username=' +c['username']+'&password='+c['password']);

        function getExplorerInfo() {
            var explorer = window.navigator.userAgent.toLowerCase() ;
            //ie
            if (explorer.indexOf("msie") >= 0) {
                var ver=explorer.match(/msie ([\d.]+)/)[1];
                return {type:"IE",version:ver};
            }
            //firefox
            else if (explorer.indexOf("firefox") >= 0) {
                var ver=explorer.match(/firefox\/([\d.]+)/)[1];
                return {type:"Firefox",version:ver};
            }
            //Chrome
            else if(explorer.indexOf("chrome") >= 0){
                var ver=explorer.match(/chrome\/([\d.]+)/)[1];
                return {type:"Chrome",version:ver};
            }
            //Opera
            else if(explorer.indexOf("opera") >= 0){
                var ver=explorer.match(/opera.([\d.]+)/)[1];
                return {type:"Opera",version:ver};
            }
            //Safari
            else if(explorer.indexOf("Safari") >= 0){
                var ver=explorer.match(/version\/([\d.]+)/)[1];
                return {type:"Safari",version:ver};
            }
        }


        //如果浏览器是IE，并且安装有vlc插件，则返回true；此判断方法不可用于firefox
        function isInsalledIEVLC(){

            var vlcObj = null;
            var vlcInstalled= false;

            try {
                vlcObj = new ActiveXObject("VideoLAN.Vlcplugin.1");
                if( vlcObj != null ){
                    vlcInstalled = true
                }
            } catch (e) {
                vlcInstalled= false;
            }
            return vlcInstalled;
        }

        //如果浏览器是firefox，并且安装有vlc插件，则返回true；此判断方法不可用于IE
        function isInsalledFFVLC2(){
            var numPlugins=navigator.plugins.length;
            for  (var i=0;i<numPlugins;i++)
            {
                var plugin=navigator.plugins[i];
                if(plugin.name.indexOf("VideoLAN") > -1 || plugin.name.indexOf("VLC") > -1)
                {
                    return true;
                }
            }
            return false;
        }

        layer.open({
            type: 1,
            title: camera['eq_name'],
            skin: 'layui-layer-lan',
            area: ['800px', '500px'],
            shade: 0.5,
            content: '<div id="camera"></div>'
        });

        var exp = getExplorerInfo().type;
        console.log(exp);

        var ip = camera['ip'];
        var port = camera['port'];
        var username = camera['username'];
        var password = camera['password'];


        var url = 'rtsp://'+ username +':'+ password +'@'+ ip +':'+ port +'/MPEG-4/ch1/main/av_stream';

        if(exp == 'IE'){
            //IE支持
            if(isInsalledIEVLC()){
                $('#camera').append("<object classid='clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921' codebase='http://download.videolan.org/pub/videolan/vlc/last/win32/axvlc.cab' width='720' height='410'>" +
                    "<param name='mrl' value='"+ url + "'/> " +
                    "<param name='volume' value='50' />" +
                    "<param name='autoplay' value='true' /> " +
                    "<param name='loop' value='false' />" +
                    "<param name='fullscreen' value='true' /> " +
                    "<param name='controls' value='true' /> " +
                    "</object>");
            }else{
                $('#camera').show();
            }
        }else if(exp == 'Firefox'){
            //火狐支持
            if(isInsalledFFVLC2()){
                var obj = $("<object type='application/x-vlc-plugin' pluginspage='http://www.videolan.org/' id='vlc' events='false' width='720' height='410'>" +
                    "<param name='mrl' value='"+ url +"' />" +
                    "<param name='volume' value='50' />" +
                    "<param name='autoplay' value='true' />" +
                    "<param name='loop' value='false' />" +
                    "<param name='fullscreen' value='true' />" +
                    "<param name='controls' value='true' />" +
                    "</object>");
                $('#camera').append(obj);
            }else{
                $('#camera').show();
            }
        }else{
            $('#camera').show();
        }



    };
    return this
});




