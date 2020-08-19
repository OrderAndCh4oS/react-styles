'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const tildeImporter = require('node-sass-tilde-importer');

const precss = require('precss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass({
            importer: tildeImporter,
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build'))
        .pipe(gulp.dest('./public'))
});

gulp.task('css', () => {
    const postcss = require('gulp-postcss');
    const sourcemaps = require('gulp-sourcemaps');
    const plugins = [
        precss(),
        autoprefixer(),
        cssnano(),
    ];
    return gulp.src('build/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(plugins))
        .pipe(rename('styles.module.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./sass/*.scss', gulp.series('sass'));
    gulp.watch('./build/*.css', gulp.series('css'));
});

gulp.task('default', gulp.series('sass', 'css'));
