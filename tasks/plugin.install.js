(function () {

    'use strict';

    var fs = require('fs');
    var spawn = require('child_process').spawn;
    var yaml = require('js-yaml');
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var del = require('del');
    var DecompressZip = require('decompress-zip');



    var pluginDirectory = 'app/scripts/plugins/',
        pluginConfigDirectory = 'config/plugin/',
        pluginFile,
        originalFullPluginPath,
        pluginFileName,
        originalPluginPath,
        tempPluginName,
        installInSameLocation,
        pluginName,
        installTask;

    function copyZip(done) {

        var args = require('yargs')
            .alias('path', 'p')
            .alias('no-zip', 'nz')
            .demand('path').argv,
            isValidFile = true;

        pluginFile = args.path;
        originalFullPluginPath = pluginFile.split('/');
        pluginFileName = originalFullPluginPath.pop();
        originalPluginPath = originalFullPluginPath.join('/') + '/';
        tempPluginName = 'plugin_temp';
        installInSameLocation = pluginDirectory === originalPluginPath;

        try {
            isValidFile = fs.lstatSync(pluginFile).isFile();
        } catch (err) {
            isValidFile = false;
        }

        if (isValidFile) {
            return gulp.src(pluginFile)
                .on('error', function () {
                    var errorMessage = `Plugin ${pluginFileName} not found`;
                    done(errorMessage);
                })
                .pipe(gulp.dest(pluginDirectory));
        } else {
            done('Could not find a plugin at the path specified');
        }
    }

    function unzipPlugin(done) {
        var unzipper = new DecompressZip(pluginDirectory + pluginFileName);
        unzipper.extract({
            path: pluginDirectory + tempPluginName
        });

        unzipper.on('extract', function (log) {
            done();
        });

        unzipper.on('error', function (err) {
            done('Error unzipping plugin file: '+ err);
        });
       /* return gulp.src(pluginDirectory + pluginFileName)
            .pipe(plugins.unzip({
                keepEmpty: true
            }))
            .pipe(gulp.dest(pluginDirectory + tempPluginName));*/
    }

    function removeZip() {
        return del([pluginDirectory + pluginFileName]);
    }

    function installPlugin(done) {

        var installDir = pluginDirectory + tempPluginName + '/install',
            hasInstallDir = false,
            command,
            cp;

        try {
            // check if plugin has install script by trying to access /install directory
            // if install directory is present, call npm install in it
            fs.accessSync(installDir);
            hasInstallDir = true;
        } catch (e) {
            // if install dir
            done();
        }

        if (hasInstallDir) {
            command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
            cp = spawn(command, ['install'], {
                cwd: installDir,
                stdio: 'inherit'
            });
            cp.on('close', function (code) {
                if (code === 0) {
                    done();
                } else {
                    done(`Failed to complete plugin installation`);
                }
            });
        }
    }

    function readPlugin(done) {
        var pluginConfigPath = pluginDirectory + tempPluginName + '/plugin.yml';
        var pluginConfig = yaml.safeLoad(fs.readFileSync(pluginConfigPath, 'utf8'));

        pluginName = pluginConfig.name;

        if (pluginName) {
            done();
        } else {
            done('Config doesn\'t provide a plugin name');
        }
    }

    function renamePlugin() {
        var pluginLocation = pluginDirectory + pluginName;

        return del([pluginLocation]).then(function () {
            fs.renameSync(pluginDirectory + tempPluginName, pluginLocation);
        });
    }

    function copyPluginConfig() {
        return gulp.src(pluginDirectory + pluginName + '/plugin.yml')
            .pipe(plugins.rename(pluginName + '.yml'))
            .pipe(gulp.dest(pluginConfigDirectory));
    }


    installTask = gulp.series(copyZip, unzipPlugin, removeZip, installPlugin, readPlugin, renamePlugin, copyPluginConfig);


    module.exports = {
        install: installTask
    };

})();