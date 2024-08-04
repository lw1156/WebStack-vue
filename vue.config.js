module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        disableHostCheck: true,
        proxy: {
            //拦截路径携带/api
            '/api': {//表示拦截以/api开头的请求路径
                //替换源和后端源一直  http://localhost:8080   --> http://localhost:9090
                target: 'http://localhost:8081',
                changOrigin: true,//是否开启跨域
                pathRewrite: {
                    '^/api': '' //重写api，把api变成空字符，因为我们真正请求的路径是没有api的
                }
            }
        }
    }

};
