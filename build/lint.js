var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

var lint = function (files) {
    return new Promise(function (resolve, reject) {
        var opts = process.argv.splice(2)
        opts.push(files.join(' '))
        var eslint = spawn('node_modules/.bin/eslint', opts, { shell: true, stdio: "inherit" });

        eslint.on('exit', function (code) {
            if (code === 1) {
                reject()
            }
        });
    })
};

var getDiff = function () {

    var cmd = "git diff HEAD --name-only --diff-filter=ACMR -- src/pages | grep -E '\.(js|vue)$'";

    return new Promise(function (resolve, reject) {

        exec(cmd, function (error, stdout, stderr) {
            if (stdout === '') process.exit(0);

            if (!error) {
                files = stdout.split('\n');
                files.pop();
                resolve(files);
            } else {
                reject(stderr);
            };
        });

    });

};

getDiff()
    .then(lint)
    .catch(function (error) {
        if (error) console.log(error)
        process.exit(1)
    });