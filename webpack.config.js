const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './client/src'),
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './app',
  ],
  output: {
    path: path.resolve(__dirname, './client/build'),
    filename: 'bundle.js',
  },
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'react-hot',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$|\.js$/,
        loader: ['babel-loader'],
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass'),
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=index.html',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://localhost:3000',
    },
  },
};
