var gulp = require('gulp');
var connect = require('gulp-connect'); // 起服务
var watch = require('gulp-watch'); // 监听文件
var minHtml = require('gulp-htmlmin'); // 压缩html
var scss = require('gulp-sass'); // 编译scss
var minCss = require('gulp-clean-css'); // 压缩css
var uglify = require('gulp-uglify') //压缩js
var imageMin = require('gulp-imagemin');

var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};


// 编译scss 压缩css
gulp.task('Scss', function() {
    gulp.src('src/css/*.scss')
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('dist/css'))
});
// 压缩css
gulp.task('MinCss', function() {
        gulp.src('src/css/*.css', { base: 'src' })
            .pipe(minCss())
            .pipe(gulp.dest('dist'))
    })
    //压缩js
gulp.task('minJs', function() {
        gulp.src('src/js/*.js', { base: 'src' })
            .pipe(uglify())
            .pipe(gulp.dest('dist'))
    })
    // 压缩图片
gulp.task('Image', function() {
    gulp.src('src/images/*.jpg', { base: 'src' })
        .pipe(imageMin())
        .pipe(gulp.dest('dist'))
});
// 压缩原页面
gulp.task("htmlmin", function() {
    gulp.src("src/*.html")
        .pipe(minHtml(options))
        .pipe(gulp.dest("dist"))
})




// 启动服务
gulp.task('httpServer', function() {
    connect.server({
        root: 'dist', // 指定文件夹映射网址
        port: 3000,
        livereload: true
    })
})

// 刷新页面
gulp.task('reloadPage', function() {
    gulp.src('.')
        .pipe(connect.reload());
})

// 更改调用刷新
gulp.task('watch', function() {
    gulp.watch('./src/index.html', ['htmlmin', 'reloadPage'])
    gulp.watch('./src/css/*.scss', ['Scss', 'reloadPage'])

})

// 默认执行
gulp.task('default', ['Scss', 'Image', 'minJs', 'MinCss', 'htmlmin', 'watch', 'httpServer'])