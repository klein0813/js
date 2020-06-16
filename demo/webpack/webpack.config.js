module.exports = {
  entry: `${__dirname}/app/main.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    port: 8081,
    inline: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        // use: {
        //   loader: 'babel-loader',
        //  // options: {
        //  //   presets: ['@babel/env', '@babel/react']
        //  // }
        // },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // 指定启用css modules
              localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
            }
          }
        ]
        // use: {
        //   {
        //     loader: 'css-loader'
        //   },
        //   {
        //     loader: 'style-loader'
        //   },
        // }
      }
    ]
  }
}

// options: {
//   configFile: utils.resolveProjectPath('.babelrc.js'),
//   cacheDirectory: config.isProd ? utils.resolveCachePath('babel') : false,
// },
