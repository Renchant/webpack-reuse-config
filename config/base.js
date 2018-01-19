/**
 * @description webpack通用配置
 * @author minfive
 * @date 2017-07-17, 10:44:21 GMTCST
 * @lastModify minfive
 * @lastDate 2017-07-17, 10:44:21 GMTCST
 */

const path = require('path');

module.exports = {
	// 多页配置
	isMultiplePage: true,
	// 是否启用异步加载功能
	isOpenSyncImport: true,
	// 最小chunk的大小
	minChunkSize: 10000,
	// dev模式下是否自动打开页面
	autoOpenBrowser: true,
	// 文件目录
	assetsRoot: path.resolve(__dirname, '../src'),
	// 生成目录
	buildRoot: path.resolve(__dirname, '../dist'),
	// 静态资源根目录
	staticAssets: 'static',
	// 生成路径
	publicPath: '/',
	// cdn 配置
    cdn: {
        accessKey: 'JSJQ9zNlLIyPb3jYK4t31y5ent-1h0Dyaf_2mjV9',
        secretKey: 'AKZ4wiEvBzoGnmJD22ElZdAclsdlhf31_Z3yQAQq',
        bucket: 'wanqu',
        origin: 'http://fs.sawadka.site',
        uploadURL: 'http://up-z2.qiniu.com'
    },
	// 公用别名
	commonAlias: {
		Static: 'static',
		'@': 'pages',
		'Index@': 'pages/index'
	},
	// 外部扩展
	externals: {

	},
	// 公众模块(默认情况下common／js文件下的文件作为`commons chunk`打包)
	commons: {
		// 'axios': 'axios'
	},
	// 要打包的外部资源库
	library: [
		'axios',
		'hyperapp'
	],
	// 要引进外部资源库的页面(为空则全部引入)
	libraryEntry: [],
	// 本地开发端口
	port: 8003,
	// 本地开发代理
	proxy: {
		// '/api': {
		// 	target: "http://*.com",
		// 	changeOrigin: true,
		// 	pathRewrite: {
		// 		'^/api': ''
		// 	},
		// 	logLevel: 'error'
		// }
	}
}