'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
     sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    spriter = require('gulp-css-spriter'),
    rev = require('gulp-rev'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    minifyHtml = require('gulp-minify-html'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    revCollector = require('gulp-rev-collector');

// // Modules for webserver and livereload
// var express = require('express'),
//     refresh = require('gulp-livereload'),
//     livereload = require('connect-livereload'),
//     livereloadport = 35729,
//     adminServerport = 3000;


// // 状态
    var condition = true;

// // 设置一个未开启的 管理界面 server 
// var adminServer = express();

//adminServer.use(livereload({port: livereloadport}));  //页面自动刷新，暂时取消
// dist作为跟文件夹
// adminServer.use(express.static('./dist'));

// adminServer.all('/*', function(req, res) {
//   res.sendFile('index.html', { root: 'dist/views' });
// });



// 后台开发构建
gulp.task('admin', [ 'minImg', 'styles' , 'adminBrowserify','move1'], function() { 
 gulp.start('views','adminSprite');
});


// 后台  正式构建
gulp.task('adminBuild', function() { 
   gulp.start( 'revImg', 'revAdminCollectorCss' ,'adminMiniCss' , 'adminMiniJs', 'adminMiniHtml','move');
  });



// 开发构建时清除目录
gulp.task('cleanAdmin', function() {
return  gulp.src(['cache/css','cache/img', 'cache/js', 'cache/views' ], {read: false})
    .pipe(clean());
});

// 删除正式构建时生成目录
gulp.task('cleandist', function() {
 return gulp.src(['dist'], {read: false})
    .pipe(clean());
});




/**
 * app写入cache  在客户端执行
 */

gulp.task('adminSprite',function() {
    gulp.src('app/styles/main.css')
        .pipe(spriter({
            'spriteSheet': 'cache/img/adminSprite.png',
            'pathToSpriteSheetFromCSS': '../img/adminSprite.png'
        }))
        .pipe(gulp.dest('cache/css'));
});

//后台js合成
gulp.task('adminBrowserify', function() {
  browserify('app/scripts/main.js')
      .bundle()
      .pipe(source('main.js')) 
      .pipe(buffer()) 
      // .pipe(uglify())  
      .pipe(gulp.dest('cache/js'));
});

// 后台模版目录
gulp.task('views', function() { 
  gulp.src('app/views/**/*')
  .pipe(gulp.dest('cache/views/'));
});

//图片压缩
    gulp.task('minImg', function () {
     gulp.src('app/img/**/*.{png,jpg,gif,ico}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('cache/img'));
   
    });






/**
 * cache写入相应的前后台文件夹  服务器端执行
 */

     //后台img 根据MD5获取版本号
     gulp.task('revImg', function(){
       return  gulp.src('cache/img/*.{png,jpg,gif,ico}')
             .pipe(rev())
             .pipe(gulp.dest('dist/img'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('cache/adminRev/img'));
     });

     //压缩JS/生成版本号
     gulp.task('adminMiniJs', function(){
       return  gulp.src('cache/js/main.js')
             .pipe(rev())
             .pipe(gulp.dest('dist/js'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('cache/adminRev/js'));
     });

    // CSS里更新引入文件版本号
     gulp.task('revAdminCollectorCss', function () {
      return   gulp.src(['cache/adminRev/**/*.json', 'cache/css/main.css'])
             .pipe(revCollector())
             .pipe(gulp.dest('dist/css'));
     });

     //压缩/合并CSS/生成版本号
     gulp.task('adminMiniCss', function(){
       return  gulp.src('cache/css/main.css')
             .pipe(rev())
             .pipe(gulpif(
                     condition, changed('dist/css')
             ))
             .pipe(autoprefixer({
                 browsers: ['last 2 versions'],
                 cascade: false,
                 remove: false       
             }))
             .pipe(gulp.dest('dist/css'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('cache/adminRev/css'));
     });

     //压缩Html/更新引入文件版本
    gulp.task('adminMiniHtml', function () {
       return  gulp.src(['cache/adminRev/**/*.json', 'cache/views/*.html'])
             .pipe(revCollector())
             .pipe(gulpif(
                 condition, minifyHtml({
                     empty: true,
                     spare: true,
                     quotes: true
                 })
             ))
             .pipe(gulp.dest('dist/views'));
     });

/**
 * 监视变化   设置未修改，有bug
 */

gulp.task('watchAdmin',function() {
  adminServer.listen(adminServerport);
  refresh.listen(livereloadport);
  gulp.watch('cache/img/*.{png,jpg,gif,ico}', ['revImg']);

  gulp.watch('cache/adminRev/css/*.json', ['revAdminCollectorCss']);
 
  gulp.watch('cache/css/main.css', ['adminMiniCss']);

  gulp.watch('cache/js/main.js', ['adminMiniJs']);
  
  gulp.watch(['cache/adminRev/**/*.json','cache/views/*.html'], ['adminMiniHtml']);
  gulp.watch(['cache/framework/**/*','cache/data/*'], ['move']);
});

