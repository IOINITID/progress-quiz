"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var uglify = require("gulp-uglify");
var svgstore = require("gulp-svgstore");
var del = require("del");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("cssmin", function () {
  return gulp.src("build/css/style.css")
    .pipe(sourcemap.init())
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
})

gulp.task("copy", function () {
  return gulp.src([
      "source/fonts/**/*.{woff,woff2}",
      "source/js/**/*.min.js"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("slick", function () {
  return gulp.src([
      "source/slick/*",
      "source/slick/*/**",
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 75
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("js", function () {
  return gulp.src([
      "source/js/**/*.js",
      "!source/js/**/*.min.js"
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("sprite", function () {
  return gulp.src([
      "source/img/logo.svg",
      "source/img/icon-*.svg"
    ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "cssmin"));
  // gulp.watch(["source/img/logo.svg", "source/img/icon-*.svg"], gulp.series("sprite", "refresh"));
  gulp.watch("source/*.html").on("change", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js").on("change", gulp.series("js", "copy", "refresh"));
});
// gulp.task("build", gulp.series("clean", "css", "cssmin", "js", "copy", "slick", "sprite", "html", "webp", "images"));
gulp.task("build", gulp.series("clean", "css", "cssmin", "js", "copy", "slick", "html", "webp", "images"));
gulp.task("start", gulp.series("build", "server"));
