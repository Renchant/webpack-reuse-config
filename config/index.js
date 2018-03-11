/**
 * @description webpack配置
 * @author milk
 * @date 2017-07-17, 10:47:57 GMTCST
 * @lastModify milk
 * @lastDate 2017-07-17, 10:47:57 GMTCST
 */

const 
	path = require('path'),
	Glob = require('glob').Glob,
	base = require('./base');

let { mapObject, arrToObj } = require('./util');

function getPath(...args) {
	return path.join(base.assetsRoot, ...args);
}

function getEntrySetting() {
	let result = {
		entry: {},
		template: []
	};

	new Glob('!(_)*/!(_)*.html', {
		cwd: getPath('pages'),
		sync: true
	})
		.found
		.forEach(file => {
			let pageName = file.split('/')[0];

			result.entry[pageName] = getPath('pages', pageName, 'js', 'index.js');
			result.template.push(getPath('pages', file));
		});

	return result;
}

let setting = getEntrySetting();

let baseConfig = Object.assign({}, base, {
	entry: base.isMultiplePage ? setting.entry : { index: getPath('pages/index/js/index.js') },
	template: base.isMultiplePage ? setting.template : [getPath('pages/index/index.html')],
	outputPath: base.buildRoot,
	commonAlias: mapObject(base.commonAlias, value => getPath(value))
});

module.exports = {
	build: Object.assign({}, baseConfig, {
		env: require('./prod.env')
	}),
	'build:d': Object.assign({}, baseConfig, {
		env: require('./prod-d.env'),
		sourceMap: '#source-map',
		cdn: null
	}),
	dev: Object.assign({}, baseConfig, {
		env: require('./dev.env'),
		cdn: null
	})
}