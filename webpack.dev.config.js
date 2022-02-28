const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: { fibonacci: './src/fibonacci.js' },
  plugins: [new MiniCssExtractPlugin()],
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
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'src')
    }
  },
  devtool: 'source-map'
};