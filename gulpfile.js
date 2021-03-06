var gulp = require("gulp")
var sourcemaps = require("gulp-sourcemaps")
var livereload = require("gulp-livereload")
var autoprefixer = require("gulp-autoprefixer")

var cssnano = require("gulp-cssnano")
var sass = require("gulp-sass")

var webpack = require("webpack-stream")
var webpackConfig = require("./webpack.config.js")

gulp.task("sass", function() {
  return gulp.src("src/sass/main.+(sass|scss)")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ browsers: ["> 1%"] }))
    .pipe(cssnano())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("assets/css/"))
    .pipe(livereload())
})

gulp.task("babelify", function() {
  return (gulp.src("src/js/index.js"))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("assets/js/"))
    .pipe(livereload())
})

gulp.task("build", [ "sass", "babelify" ])

gulp.task("watch", function() {
  livereload.listen()
  gulp.watch("src/js/**/*.+(js|json)", ["babelify"])
  gulp.watch("src/sass/**/*.+(sass|scss)", ["sass"])
})

gulp.task("default", [ "build", "watch" ])
