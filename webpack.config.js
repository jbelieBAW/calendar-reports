const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
            exclude: /node_modules/,
            use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
        }
      ]
    },
    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
      /*new webpack.DefinePlugin({ 
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),*/
      new DuplicatePackageCheckerPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({   
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
	  	alias: {
		'@restart/hooks': path.resolve(__dirname, 'node_modules/@restart/hooks'),
		},
    },
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          compress: true,
          port: 9000,
    }
  };