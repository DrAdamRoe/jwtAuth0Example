const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config()

module.exports = env => {
  
  console.log('Auth0 Application domain: APP_DOMAIN: ', process.env.APP_DOMAIN); // 'APP_DOMAIN'

  return{
    entry: './app.jsx',

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'APP_DOMAIN': JSON.stringify(process.env.APP_DOMAIN),
          'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        }
      })
    ],

    mode: 'development',
    
    output: {
      path: __dirname,
      filename: 'bundle.js',
    },

      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }          
          }
        ]
      }
    }
};
