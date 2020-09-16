const gulp = require("gulp");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
//创建一个浏览器服务器
const bs = require("browser-sync").create();
const sass = require("gulp-sass");
//gulp-util这个插件有一个log方法，可以打印出js的错误信息
const util = require("gulp-util");
//该插件是为了定位js出现的错误的位置
const sourcemaps = require("gulp-sourcemaps");
const babel = require('gulp-babel')

const path = {
    'html': './**/',
    'css': './src/css/**/',
    'js': './src/js/**/',
    'images': './src/images/',
    'dist_css': './css/',
    'dist_js': './js/',
    'dist_images': './images/',
};

//定义处理HTML的任务
gulp.task('html', function(done) {
    gulp.src(path.html + '*.html')
        .pipe(bs.stream())
    done()
});

//定义css处理文件
gulp.task('css', function(done) {
    gulp.src(path.css + '*.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(cssnano())
        .pipe(rename({
            'suffix': ''
        }))
        .pipe(gulp.dest(path.dist_css))
        .pipe(bs.stream())
    done()
});

//定义js处理文件
gulp.task('js', function(done) {
    gulp.src(path.js + '*.js')
        .pipe(babel())
        .pipe(sourcemaps.init())
        //toplevel如果要启用顶级变量和函数名管理，并删除未使用的变量和函数，请设置为true
        .pipe(uglify({
            'toplevel': false,
            'mangle': true,
            'warnings': true,
            'compress': false
        }).on("error", util.log))
        .pipe(rename({
            'suffix': '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist_js))
        .pipe(bs.stream());
    done()
});

//定义images的处理文件
gulp.task('images', function(done) {
    gulp.src(path.images + '*.*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest(path.dist_images))
        .pipe(bs.stream())
    done()
});

//定义监听文件修改的任务
gulp.task('watch', function(done) {
    gulp.watch(path.css + '*.scss', gulp.series('css'));
    gulp.watch(path.js + '*.js', gulp.series('js'));
    gulp.watch(path.images + '*.*', gulp.series('images'));
    gulp.watch(path.html + '*.html', gulp.series('html'));
    done()
});

// ES6转化ES5
// gulp.task("babel", function (done) {
// 	gulp.src(path.js + "*.js") // ES6 源码存放的路径
// 		.pipe(babel())
// 		.pipe(gulp.dest(path.dist_js)); //转换成 ES5 存放的路径
// 		done()
// });

//初始化browser-sync的任务
gulp.task('bs', function(done) {
    bs.init({
        'server': {
            'proxy': '127.0.0.1',
            'baseDir': "./",
            'index': 'index.html'
        },
    });
    done()
});

// //定义gulp启动
// gulp.task('default', ['bs', 'watch']);

gulp.task('default', gulp.series('bs', 'watch'));