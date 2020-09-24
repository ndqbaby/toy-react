module.exports = {
    entry: {
        main: './main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    // options:{presets: ['@babel/preset-env'], plugins: ['@babel/plugin-transform-react-jsx']}
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-react-jsx',
                                {pragma: 'createElement'} //gragma 里面是什么React.createElement会被替换成什么.(可以和上面做比较)
                            ]
                        ]
                    }
                }
            }
        ]
    },
    mode: 'development', //和下面的optimization 配合可以编译出可以读懂的代码
    optimization: {
        minimize: false
    }
}