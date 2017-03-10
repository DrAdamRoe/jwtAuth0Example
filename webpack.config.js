module.exports = {
  entry: './app.jsx',

  output: {
    path: './',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'babel-preset-react',
            [
              'env',
              {
                'targets': {
                  'browsers': ['last 2 versions'],
                },
              },
            ],
          ],
        },
      },
    ],
  },
};
