const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src'),
  distDir = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'production',
  entry: { fibonacci: './src/fibonacci.js' },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: '*.html', context: srcDir },
        { from: 'blog_resources', to: 'blog_resources/', context: srcDir }
      ],
    })
  ],
  output: {
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { import: false }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: 'file-loader',
          options: {
            context: srcDir,
            name: '[path][name].[ext]',
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js', '.json', '.css', '.scss', '.sass']
  },
  optimization: {
    minimize: true
  }
};