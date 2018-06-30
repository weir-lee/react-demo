# react-demo-1 react起步配置
```
npm install --save-dev webpack webpack-cli webpack-dev-server

"scripts": {
    "dev": "webpack-dev-server --config=./build/webpack.config.dev.js --hot",
    "build": "webpack --config=./build/webpack.config.prod.js"
}

npm run dev

npm run build

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Development</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- 注意 开发环境下js文件打包后存在内存里，webpack-dev-server会虚拟这个js文件的路径。html里引入js的路径是webpack.config.dev.js中的  output.publicPath + output.filename，本例子中就是 /xuni/abundle.js

    生产环境打包时，js的路径也是 output.publicPath + output.filename
     -->
    <script type="text/javascript" src="/xuni/abundle.js"></script></body>
</html>

```

开发环境的配置请参考 ./build/webpack.config.dev.js

hhhh

hhhh

生产环境的配置请参考 ./build/webpack.config.prod.js

### 另外请注意webpack版本，1和2 +的配置是不同的