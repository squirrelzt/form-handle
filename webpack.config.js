const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	optimization: {
		splitChunks: {
		  chunks: 'all',
		  minSize: 30000,
		  maxSize: 0,
		  minChunks: 1,
		  maxAsyncRequests: 5,
		  maxInitialRequests: 3,
		  automaticNameDelimiter: '~',
		  automaticNameMaxLength: 30,
		  name: true,
		  cacheGroups: {
			vendors: {
			  test: /[\\/]node_modules[\\/]/,
			  priority: -10
			},
			default: {
			  minChunks: 2,
			  priority: -20,
			  reuseExistingChunk: true
			}
		  }
		}
	},
    entry: {
        index: './src/entry/index.js'
	},
	mode: 'development',
	devtool: 'inline-source-map',
    devServer: {
		historyApiFallback:true,
        contentBase: './dist'
	},
    plugins: [
        // new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
				favicon:'./src/entry/images/favicon.ico',
				title: '表单处理系统',
				minify:{
					html5:true,
					collapseWhitespace: true,
					preserveLineBreaks: false,
					minifyCSS: true,
					minifyJS: true,
					removeComments: false
				}
			}),
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin("[name].css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp:/\.css$/g,
  			cssProcessor:require('cssnano')
		}),
		// new BundleAnalyzerPlugin({
		// 	analyzerPort: 8919
		// })
	],
    output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
		},
		// optimization: {
		// 	minimizer: [new UglifyJsPlugin()],
		//   },
  module: {
	  rules: [
	    {
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				'babel-loader'
			]
		  },{
			test: /\.(png|svg|jpg|gif|ico)$/,
			use: [
				'file-loader'
			]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [
				'file-loader'
				]
		}, {
			test: /\.(csv|tsv)$/,
			use: [
				'csv-loader'
				]
		}, {
			test: /\.xml$/,
			use: [
				'xml-loader'
				]
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
			  fallback: "style-loader",
			  use: "css-loader"
			})
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'less-loader'
			]
		 }
		]
  }
};