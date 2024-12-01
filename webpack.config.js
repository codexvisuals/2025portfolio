const path = require('path');

module.exports = {
  entry: {
    'bouncy-watch': './src/demos/bouncy-watch/BouncyWatchEntry.js',
    'shoe-picker': './src/demos/shoe-picker/ShoePickerEntry.js',
    'lusion-connectors': './src/demos/lusion-connectors/LusionConnectorsEntry.js',
    'diamond-app': './src/demos/diamond-app/DiamondAppEntry.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]', // Place assets in `dist/assets/`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(gltf|glb|hdr|jpg|jpeg|png)$/, // Handle 3D model and HDR/image files
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Handle CSS files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Import JS/JSX/JSON without extensions
  },
  // Removed externals to bundle React and ReactDOM together
  externals: {},
  mode: 'production',
};
