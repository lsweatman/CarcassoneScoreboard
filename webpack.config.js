/**
 * Created by Schwerve on 2/2/2017.
 */
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'src');
const CLIENT_DIR = path.resolve(__dirname, 'client/js');

module.exports = {
	//return {
		entry: {
			js: './src/app-client.js',
			vendor: ['react']
		},
		output: {
			path: CLIENT_DIR,
			filename: '[name].bundle.js'
		},
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
				/*query: {
					cacheDirectory: 'babel_cache',
					presets: ['react', 'es2015']
				}*/
			}],
		},
	//},
	/*plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			mangle: true,
			sourcemap: true,
			beautify: false,
			dead_code: true
		})
	]*/
};