const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const srcDir = path.resolve(__dirname, 'src'),
  docsDir = path.resolve(__dirname, 'docs');

module.exports = {
  mode: 'production',
  entry: { fibonacci: './src/fibonacci.js' },
  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: '*.html', context: srcDir },
        { from: 'blog_resources', to: 'blog_resources/', context: srcDir },
        { from: 'assets', to: 'assets/', context: srcDir }
      ],
    })
  ],
  output: {
    path: docsDir
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