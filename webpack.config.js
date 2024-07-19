const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlConfig = require(path.join(__dirname, 'html.config'));

const deploy = 'docs';

const plugins = [
  new HtmlWebpackPlugin(HtmlConfig),
  new MiniCssExtractPlugin(),
  new CopyPlugin({
    patterns: [
      { from: path.resolve(__dirname, 'static'), to: path.resolve(__dirname, deploy) }
    ]
  })
];

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  stats: 'errors-only',
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
    vendor: path.join(__dirname, 'src', 'vendor.js'),
    styles: path.join(__dirname, 'src', 'styles.css')
  },
  output: {
    path: path.resolve(__dirname, deploy),
    clean: true, // Clean the output directory before emit.
    publicPath: '', // Necessary for webpack-dev-server
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|mp3|ogg|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: deploy + '/assets/[type]/[name][ext]'
        }
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, deploy),
    },
    compress: true,
    port: 9090, // You can specify your port here
    open: true, // Open the browser after server had been started
  }
};