(function () {

    'use strict';

    var fs = require('fs');
    var spawn = require('child_process').spawn;
    var yaml = require('js-yaml');
    var b2v = require('buffer-to-vinyl');
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var del = require('del');
    var path = require('path');


    var pluginsDir = 'app/scripts/plugins/',
        pluginDataDir = 'scripts/plugindata/',
        targetDir,
        appSettings,
        pluginSettings = {},
        pluginName,
        usePlugin;


    // use selected plugin
    function installIfNecessary(done) {
        pluginName = appSettings['PLUGIN'] || 'staticdata';

        try {
            // check if plugin is installed by trying to open the path
            fs.accessSync(pluginsDir + pluginName);
            done();
        } catch (e) {
            // plugin is not installed, attempt to install
            console.log(`${pluginName} plugin is not istalled. Installing..`);

            var command = process.platform === 'win32' ? 'gulp.cmd' : 'gulp',
                cp = spawn(command, ['install:plugin', '-p', `${pluginsDir+pluginName+'.zip'}`, '--silent'], {
                    cwd: '',
                    stdio: 'inherit'
                });
            cp.on('close', function (code) {
                if (code === 0) {
                    console.log(`${pluginName} plugin was installed.`);
                    done();
                } else {
                    done(`Failed to install plugin ${pluginName}`);
                }
            });

        }
    }

    function copyPluginData() {
        var dest = path.join(targetDir, pluginDataDir);
        return gulp
            .src(['plugins/' + pluginName + '/**/*.*', '!plugins/' + pluginName + '/**/*.js', '!plugins/' + pluginName + '/bower.json', '!plugins/'+pluginName + '/install/**'], {
                cwd: 'app/scripts'
            })
            .pipe(gulp.dest(dest));
    }

    // load plugin settings file
    function loadPluginSettings() {

        var pluginConfigPath = 'config/plugin/' + pluginName + '.yml';
        var origConfig = yaml.safeLoad(fs.readFileSync(pluginConfigPath, 'utf8'));

        // convert config parameter keys to upper case
        if (origConfig) {
            Object.keys(origConfig).forEach(function (key) {
                pluginSettings[key.toUpperCase()] = origConfig[key];
            });
        }

        return b2v.stream(new Buffer(JSON.stringify({
                PluginContext: pluginSettings
            })), 'plugin.context.constants.js')
            .pipe(plugins.ngConfig('app.plugin', {
                createModule: false,
                wrap: '(function () {\n\'use strict\';\n/*jshint ignore:start*/\n return <%= module %> /*jshint ignore:end*/\n})();'
            }))
            .pipe(gulp.dest('app/scripts/plugins/' + pluginName + '/'));
    }

    function pluginClean(done) {
        var pluginDataPath = path.join(targetDir, 'scripts/plugindata/'),
            pluginPath = path.join(targetDir, 'scripts/plugins/');

        return del([pluginDataPath, pluginPath], done);
    }

    function getName() {
        return pluginName;
    }

    function getSettings() {
        return pluginSettings;
    }

    usePlugin = gulp.series(installIfNecessary, copyPluginData, loadPluginSettings);


    module.exports = function (settings, dir) {

        appSettings = settings;
        targetDir = dir;

        return {
            use: usePlugin,
            clean: pluginClean,
            getName: getName,
            getSettings: getSettings
        };
    };

})();
