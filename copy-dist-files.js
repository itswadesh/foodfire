const fs = require('fs');
const copydir = require('copy-dir');
const mkdirp = require('mkdirp');
const path = 'prod/.nuxt'
const path1 = 'prod/static'

var rimraf = require('rimraf');
rimraf.sync('prod')
console.log('prod removed');
if (fs.existsSync(path)) { return }
if (fs.existsSync(path1)) { return }
mkdirp.sync(path)
mkdirp.sync(path1)
console.log('.nuxt and static created');
copydir.sync('.nuxt', path);
copydir.sync('static', path1);
console.log('.nuxt and static copied');

fs.createReadStream('package.json').pipe(fs.createWriteStream('prod/package.json'));
fs.createReadStream('config.js').pipe(fs.createWriteStream('prod/config.js'));
fs.createReadStream('nuxt.config.js').pipe(fs.createWriteStream('prod/nuxt.config.js'));
console.log('package.json, config.js, nuxt.config.js copied');

