let gulp = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    del = require("del"),
    svgSprite = require('gulp-svg-sprite'),
    autoprefixer = require("gulp-autoprefixer");

const svgSpriteConfig = {
    mode: {
        symbol: true, // Activate the «symbol» mode
        example: true,
    }
};


gulp.task("clean", async function () {
    del.sync("build");
});

gulp.task("scss", async function () {
    return gulp
        .src("src/scss/**/*.scss")
        .pipe(sass({ outputStyle: "compressed" }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 10 versions"],
            })
        )
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("svgSprite", async function () {
    return gulp.src("src/svg/sprite/*.svg")      
        .pipe(svgSprite(svgSpriteConfig)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest("build/svg/"));
});


gulp.task("css", async function () {
    return gulp
        .src([
            "node_modules/normalize.css/normalize.css",
            "node_modules/swiper/swiper-bundle.min.css",
        ])
        .pipe(concat("_libs.scss"))
        .pipe(gulp.dest("src/scss"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("html", async function () {
    return gulp.src("src/*.html").pipe(browserSync.reload({ stream: true }));
});

gulp.task("script", async function () {
    return gulp.src("src/js/*.js").pipe(browserSync.reload({ stream: true }));
});

gulp.task("js", async function () {
    return gulp
        .src([
            "node_modules/swiper/swiper-bundle.min.js",
            "node_modules/jquery/dist/jquery.min.js",
        ])
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", async function () {
    browserSync.init({
        server: {
            baseDir: "src/",
        },
    });
});

gulp.task("export", async function () {
    let buildHtml = gulp.src("src/*.html").pipe(gulp.dest("build"));

    let BuildCss = gulp.src("src/css/**/*.css").pipe(gulp.dest("build/css"));

    let BuildJs = gulp.src("src/js/**/*.js").pipe(gulp.dest("build/js"));

    let BuildFonts = gulp
        .src("src/fonts/**/*.*")
        .pipe(gulp.dest("build/fonts"));

    let BuildImg = gulp.src("src/img/**/*.*").pipe(gulp.dest("build/img"));

    gulp.src("src/svg/sprite/*.svg")      
        .pipe(svgSprite(svgSpriteConfig)).on('error', function(error){ console.log(error); })
        .pipe(gulp.dest("build/svg/"));
});

gulp.task("watch", async function () {
    gulp.watch("src/scss/**/*.scss", gulp.parallel("scss"));
    gulp.watch("src/*.html", gulp.parallel("html"));
    gulp.watch("src/js/*.js", gulp.parallel("script"));
});

gulp.task("build", gulp.series("clean", "export"));

gulp.task(
    "default",
    gulp.parallel("css", "scss", "js", "browser-sync", "watch", "svgSprite")
);
