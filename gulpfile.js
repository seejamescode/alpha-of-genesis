var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

gulp.task('html', function() {
    return gulp.src('html/*.html')
        .pipe(gulp.dest('static'))
});

gulp.task('images', function() {
    return gulp.src('images/**')
        .pipe(gulp.dest('static/images'))
});

/* Compile Our Sass */
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('static/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/css'))
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('static/js'))
});

gulp.task('component_js', function() {
    return gulp.src([
                     'bower_components/jquery/dist/jquery.js',
                     'bower_components/three.js/three.js',
                     'bower_components/threex.windowresize/threex.windowresize.js',
                     'bower_components/ShaderParticleEngine/build/ShaderParticles.js',
                     'bower_components/watch/src/watch.js',
                     'bower_components/flat-surface-shader/deploy/fss.js'
                     ])
        .pipe(gulp.dest('static/js'));
});

gulp.task('component_css', function() {
    return gulp.src([
                     'bower_components/normalize.css/normalize.css'
                     ])
        .pipe(gulp.dest('static/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('static/css'));
});

gulp.task('webserver', function() {
    connect.server({
        port: 5000,
        root: 'static'
    });
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    gulp.watch('html/*.html', ['html']);
    gulp.watch('images/**', ['images']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('js/*.js', ['js']);
});

gulp.task('default', ['html', 'images', 'sass', 'js', 'component_js', 'component_css', 'watch', 'webserver']);