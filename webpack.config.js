var webpack = require('webpack');
var config =require('config');
module.exports = {
    // ҳ������ļ�����
    entry : {
        'main': './app/main.js'
    },
    // ����ļ��������
    output : {
        path : __dirname + '/output/js/',
        filename : '[name].bundle.js'
    },
    module: {
        // ����������
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test:/\.(png|jpg)$/,
            loader:'url-loader?limit=8192'
        },
        {
            test:/\.less$/,
            loader:'style-loader!css-loader!less-loader'
        },
      { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" }
        ]        
    },
    // ���������������
    resolve: {
        extensions: [ '.js', '.jsx', '.json','.less'],
    },
	
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
    },node: {
  fs: "empty"
},
    // �
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }), new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
			$:"jquery",
			jQuery:"jquery",
			"window.jQuery":"jquery"
		})
    ]
}