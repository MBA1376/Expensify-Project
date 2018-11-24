const path = require('path');


module.exports = {
	entry : './src/playground/redux-expensify.js' ,
	output : {
		path : path.join(__dirname , 'public') ,
		filename : 'bundle.js'
	 } ,
	module : {
		rules : [{
			loader : 'babel-loader' ,
			test : /\.js$/ ,
			exclude : /node_modules/
		} ,
		{
			test : /\.s?(c|a)ss$/,
			 use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
		}]
	} ,
	devtool : 'cheap-module-eval-source-map' ,
	devServer : {
		contentBase : path.join(__dirname , 'public') ,
		historyApiFallback : true
	} 
	
}