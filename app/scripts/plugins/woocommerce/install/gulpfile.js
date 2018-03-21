(function () {

    'use strict';

    var gulp = require('gulp'),
        plugins = require('gulp-load-plugins')(),
        questions = require('./questions')(),
        term = require('terminal-kit').terminal,
        inquirer = require('inquirer'),
        setupContext = {};

    // collect answers
    function collectAPIEndpoint(done) {
        term.clear();

        inquirer.prompt(questions.wcAPIEndpoint).then(function (result) {
            extend(setupContext, result);            
            done();
        }, function (error) {
            console.log(error);
            done();
        });
    }

    function processPluginTemplates() {
        return gulp.src('templates/plugin/**')
            .pipe(plugins.template(setupContext))
            .pipe(gulp.dest('../'));
    }   

    function finishInstallation(done) {
        term.brightCyan('Woocommerce MobileFront plugin was successfully installed.');
        done();
    }

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
    }

    // main sequence
    gulp.task('default', gulp.series(
        collectAPIEndpoint,        
        processPluginTemplates,
        finishInstallation
    ));

})();