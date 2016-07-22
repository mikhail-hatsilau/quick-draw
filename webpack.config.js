const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './client/src'),
  entry: [
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/only-dev-server',
    './app',
  ],
  output: {
    path: path.resolve(__dirname, './client/build'),
    filename: 'bundle.js',
  },
  devtool: '#inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
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
        test: /\.(html|jpg|png)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{
      from: './images/cowboy.png',
      to: 'images',
    }]),
  ],
  devServer: {
    hot: true,
    inline: true,
    proxy: {
      '*': 'http://localhost:3003',
    },
  },
};
