'use strict';
var requireDir = require('require-dir'),
express = require('express'),
gulp = require('gulp');

requireDir('./gulp', { recurse: true});

var server = express(),
    adminServer = express(),
    serverport = 5000,
    adminServerport = 3000;

// dist作为跟文件夹
server.use(express.static('./dist'));

server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist/themes' });  //sendFile 必须大写F
});

adminServer.use(express.static('./dist'));

adminServer.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist/views' });
});
  


gulp.task('default',function() {
  server.listen(serverport);
  // Start live reload
  adminServer.listen(adminServerport);
//  refresh.listen(livereloadport);  自动刷新 暂关
  gulp.watch('cache/images/*.{png,jpg,gif,ico}', ['revImages']);
  gulp.watch('cache/img/*.{png,jpg,gif,ico}', ['revImg']);
  gulp.watch('cache/rev/css/*.json', ['revCollectorCss']);
  gulp.watch('cache/adminRev/css/*.json', ['revAdminCollectorCss']);
  gulp.watch('cache/css/user.css', ['miniCss']);
  gulp.watch('cache/css/main.css', ['adminMiniCss']);
  gulp.watch('cache/js/user.js', ['miniJs']);
  gulp.watch('cache/js/main.js', ['adminMiniJs']);
  gulp.watch(['cache/rev/**/*.json','cache/themes/**/*.html'], ['miniHtml']);
  gulp.watch(['cache/adminRev/**/*.json','cache/views/*.html'], ['adminMiniHtml']);
  gulp.watch(['cache/framework/**/*','cache/data/*'], ['move']);
 
 // gulp.watch('./dist/**').on('change', refresh.changed);  程序更改自动刷新页面
});
