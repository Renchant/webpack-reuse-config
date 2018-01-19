var path = require('path')
var fs = require('fs')
var qn = require('qn')
var colors = require('colors')
var config = require('../config/base')
var pluginName = require('../package.json').name
var rootPath = path.resolve(__dirname, '../')

var distPath = 'dist'
var ignore = [
    '.DS_Store'
]

function getAllFiles(dir) {
    try {
        var paths = fs.readdirSync(dir),
            files = []

        paths.forEach(function (file) {
            var dirname = path.resolve(dir, './', file),
                stat = fs.lstatSync(dirname)

            var filter = ignore.filter(function (v) {
                return v === file
            })
            if (filter.length) return true

            if (!stat.isDirectory()) {
                files.push(dirname.replace(rootPath, '.'))
            } else {
                files = files.concat(getAllFiles(dirname))
            }
        })

        return files;
    }
    catch (e) {
        console.log(e + '\n')
    }
}

var myFiles = getAllFiles(distPath)
var client = qn.create(config.cdn)

var length = myFiles.length,
    done = 0

function qnDelete(key, cb) {
    client.delete(key, function (err) {
        if (!err) {
            console.log('Delete '.yellow + 'success'.green + ': ', key)
            cb && cb();
        } else {
            console.log('Delete '.yellow + 'error'.red + ': ', err.name + ' [code: ' + err.code + ']')
        }
    })
}

function qnUpload(dir) {
    var key = pluginName + dir.replace('./', '/');

    client.uploadFile(
        dir,
        { key: key },
        function (err, result) {
            if (!err) {
                console.log('Upload ' + 'success'.green + ': ', result.key)
            } else {
                if (err.code === 614) {
                    qnDelete(key, function () {
                        qnUpload(dir)
                    })
                    return true;
                }
                console.log('Upload ' + 'error'.red + ': ', err.name + ' [code: ' + err.code + ']')
            }

            if (++done === length) {
                console.log('\n')
            }
        }
    )
}

console.log('Upload dist/** to qiniu CDN.\n')

myFiles.forEach(qnUpload)
