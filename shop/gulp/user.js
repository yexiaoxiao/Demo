'use strict';

var gulp = require('gulp'),
    
    browserify = require('browserify'),
     
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

// Modules for webserver and livereload
// var express = require('express'),
//    // refresh = require('gulp-livereload'),
//    // livereload = require('connect-livereload'),
//     //livereloadport = 35729,
//     serverport = 5000;


// 状态
    var condition = true;



// 设置一个未开启的server
// var server = express();

// //server.use(livereload({port: livereloadport}));
// // dist作为跟文件夹
// server.use(express.static('./dist'));

// server.all('/*', function(req, res) {
//   res.sendFile('index.html', { root: 'dist/themes' });  //sendFile 必须大写F
// });




/**
 * 执行配置
 */


//默认执行
//gulp.task('default', ['dev', 'watch']);

// 前台开发构建
gulp.task('user', ['minImages', 'styles', 'browserify','move1'], function() { 
 gulp.start('themes','userSprite');
});


// 前台  正式构建
gulp.task('build', function() { 
   gulp.start( 'revImages', 'revCollectorCss' ,'miniCss' , 'miniJs', 'miniHtml','move');
  });



// 删除目录
// 开发构建时清除目录
gulp.task('clean', function() {
return  gulp.src(['cache/css','cache/images', 'cache/js', 'cache/themes' ], {read: false})
    .pipe(clean());
});


/**
 * app写入cache  在客户端执行
 */



gulp.task('userSprite',function() {
    gulp.src('app/styles/user.css')
        .pipe(spriter({
            'spriteSheet': 'cache/images/userSprite.png',
            'pathToSpriteSheetFromCSS': '../images/userSprite.png'
        }))
        .pipe(gulp.dest('cache/css'));
});


// 前台js合成
gulp.task('browserify', function() {
  browserify('app/scripts/user.js')
      .bundle()
      .pipe(source('user.js')) 
      .pipe(buffer()) 
      //.pipe(uglify())  
      .pipe(gulp.dest('cache/js'));
});


// 前台模版目录
gulp.task('themes', function() { 
  // gulp.src('app/index.html')
  // .pipe(gulp.dest('cache/'));
  gulp.src('app/themes/**/*')
  .pipe(gulp.dest('cache/themes/'));
});


//图片压缩
    gulp.task('minImages', function () {
     gulp.src('app/images/**/*.{png,jpg,gif,ico}')
      .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
      .pipe(gulp.dest('cache/images'));
   
    });


/**
 * cache写入相应的前后台文件夹  服务器端执行
 */



     //前台Images font 根据MD5获取版本号
     gulp.task('revImages', function(){
       return  gulp.src('cache/images/*.{png,jpg,gif,ico}')
             .pipe(rev())
             .pipe(gulp.dest('dist/images'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('cache/rev/images'));
     });



     //压缩JS/生成版本号
     gulp.task('miniJs', function(){
       return  gulp.src('cache/js/user.js')
             // .pipe(gulpif(
             //     condition, uglify()
             // ))
             .pipe(rev())
             .pipe(gulp.dest('dist/js'))
             .pipe(rev.manifest())
             .pipe(gulp.dest('cache/rev/js'));
     });

    // CSS里更新引入文件版本号
     gulp.task('revCollectorCss', function () {
      return   gulp.src(['cache/rev/**/*.json', 'cache/css/user.css'])
             .pipe(revCollector())
             .pipe(gulp.dest('dist/css'));
     });


     //压缩/合并CSS/生成版本号
     gulp.task('miniCss', function(){
       return  gulp.src('cache/css/user.css')
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
             .pipe(gulp.dest('cache/rev/css'));
     });


     //压缩Html/更新引入文件版本
     gulp.task('miniHtml', function () {
       return  gulp.src(['cache/rev/**/*.json','cache/themes/**/*.html'])
             .pipe(revCollector())
             .pipe(gulpif(
                 condition, minifyHtml({
                     empty: true,
                     spare: true,
                     quotes: true
                 })
             ))
             .pipe(gulp.dest('dist/themes'));
     });


//压缩首页HTML
     gulp.task('indexHtml', function () {
       return  gulp.src(['cache/rev/**/*.json','cache/index.html'])
             .pipe(revCollector())
             // .pipe(gulpif(
             //     condition, minifyHtml({
             //         empty: true,
             //         spare: true,
             //         quotes: true
             //     })
             // ))
             .pipe(gulp.dest('dist'));
     });


/**
 * 监视变化   设置未修改，有bug
 */


gulp.task('watch',  function() {
  // Start webserver
  server.listen(serverport);
  gulp.watch('cache/images/*.{png,jpg,gif,ico}', ['revImages']);
  gulp.watch('cache/rev/css/*.json', ['revCollectorCss']);
  gulp.watch('cache/css/user.css', ['miniCss']);
  gulp.watch('cache/js/user.js', ['miniJs']);
  gulp.watch(['cache/rev/**/*.json','cache/themes/**/*.html'], ['miniHtml']);
  gulp.watch(['cache/framework/**/*','cache/data/*'], ['move']);
});

