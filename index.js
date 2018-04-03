const chokidar = require('chokidar');
const colors = require('colors');
const exec = require('child_process').exec;

function compileJSFile(path) {
    const babelCompileCommand = `./node_modules/babel-cli/bin/babel-node.js ${path} --presets es2015,stage-2`;
    const nodeCompileCommand = `node ${path}`;

    exec(babelCompileCommand , function (error, output) {
        if (error) {
            console.log(colors.red(`>> Execution Error for '${path}' file:`));
            console.log(colors.red(error));
        }
        else if (output) {
            console.log(colors.blue(`>> Output for '${path}' file:`));
            console.log(colors.blue(output));
        }
    });
}

const filesToWatch = ['./src/**/*.js'];

const watcher = chokidar.watch(filesToWatch, {persistent: true});
watcher.on('change', path => compileJSFile(path));

console.log(colors.green(">> Waiting JS file changes...\n"));

  