var gulp = require("gulp");
var inject = require("gulp-inject");
var del = require('del');
var runSequence = require("run-sequence");
var watch = require('gulp-watch');

var jsLibFiles = [
	"bower_components/jquery/dist/jquery.min.js",
	"bower_components/lodash/lodash.min.js",
	"bower_components/angular/angular.min.js",
	"bower_components/angular-rx/dist/rx.angular.js",
	"bower_components/rxjs/dist/rx.all.js"
];

var cssLibFiles = [
	"bower_components/bootstrap/dist/css/bootstrap.css"
];

gulp.task("inject", function() {
	var target = gulp.src("build/index.html");
	var sources = gulp.src([ "build/js/lib/*.js", "build/**/*.js", "build/**/*.css"], {read: false});

	return target.pipe(inject(sources, {relative: true}))
		.pipe(gulp.dest("./build"));
});

gulp.task("buildHtml", function() {
	return gulp.src(["src/*.html"])
		.pipe(gulp.dest("build/"));
});

gulp.task("buildJs", function() {
	return gulp.src(["src/js/**/*"])
		.pipe(gulp.dest("build/js/"));
});

gulp.task("buildStyles", function () {
	return gulp.src(["src/styles/**/*"])
		.pipe(gulp.dest("build/styles/"));
});

gulp.task("buildImgs", function () {
	return gulp.src(["src/img/**/*"])
		.pipe(gulp.dest("build/img/"));
})

gulp.task("clean", function() {
	return del(["build/**/*"]);
});

gulp.task("libJs", function() {
	return gulp.src(jsLibFiles)
		.pipe(gulp.dest("build/js/lib"));
});

gulp.task("libStyles", function() {
	return gulp.src(cssLibFiles)
		.pipe(gulp.dest("build/styles/lib"));
})

gulp.task("default", function() {
	runSequence("build", "watch");
}); 

gulp.task("build", function(callback) {
	runSequence("clean", ["buildHtml", "libJs", "buildJs", "libStyles", "buildStyles", "buildImgs"], "inject", callback);
});

gulp.task("watch", function() {
	watch(["src/**/*", "gulpfile.js"], function () {
        gulp.start('build');
    });
});

