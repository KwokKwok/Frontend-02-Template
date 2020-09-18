module.exports = { // 老的node module常见的配置方式
    entry: "./main.js", // 入口
    module: { // webpack模块
        rules: [ // 构建规则
            {
                test: /\.js$/, // 正则指定哪些文件
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [["@babel/plugin-transform-react-jsx", {
                            pragma: "createElement"
                        }]]
                    }
                }
            }
        ]
    },
    mode: "development",// 不再压缩，可以调试
}

// 使用webpack命令打包，然后可以在dist目录看打包结果