const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

	entry: {
		main: ['./src/polyfills', './src/rxjs', './src/main', './src/styles/global.css'],
		vendor: ['normalize.css/normalize.css', 'font-awesome/css/font-awesome.css']
	},

	output: {
		filename: process.env.NODE_ENV ? '[chunkhash].[name].js' : '[name].js',
		path: path.resolve(__dirname, 'dist')
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	devtool: process.env.NODE_ENV ? "nosources-source-map" : "eval",

	module: {
		exprContextCritical: false,
		rules: [
			{
				test: /\.ts$/,
				use: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|ico)$/,
				use: [{
					loader: 'file-loader',
					options: { name: process.env.NODE_ENV ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]' }
				}]
			},
			{
				test: /\.svg$/,
				use: 'url-loader'
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: process.env.NODE_ENV ? {
						minimize: true,
						removeAttributeQuotes: false,
						caseSensitive: true,
						customAttrSurround: [[/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/]],
						customAttrAssign: [/\)?\]?=/]
					} : {}
				}]
			},
			{
				test: /\.css$/,
				exclude: [/node_modules/, path.resolve(__dirname, 'src', 'styles')],
				use: ['to-string-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.css$/,
				include: path.resolve(__dirname, 'src', 'styles'),
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.css$/,
				include: [/node_modules/, /normalize/, /font-awesome/],
				use: ['style-loader', 'css-loader']
			},
			{
				test: /fontawesome-webfont\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])$/,
				include: /node_modules/,
				use: [{
					loader: 'file-loader',
					options: { name: process.env.NODE_ENV ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]' }
				}]
			}
		]
	},
	devServer: {
		contentBase: "./dist",
		historyApiFallback: true,
		port: 3000,
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: ['commons', 'manifest']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.ejs',
			filename: 'index.html',
		}),
	]
}
