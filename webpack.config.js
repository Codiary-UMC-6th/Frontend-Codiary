const path = require('path');

module.exports = {
  entry: './src/index.ts', // 진입점(entry) 파일을 .ts 파일로 설정
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@'를 src 폴더로 매핑
    },
    extensions: ['.ts', '.tsx', '.js'], // .ts와 .tsx 확장자 인식
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,        // .ts 또는 .tsx 확장자 파일에 대해
        use: 'ts-loader',       // ts-loader를 사용
        exclude: /node_modules/,
      },
    ],
  },
};