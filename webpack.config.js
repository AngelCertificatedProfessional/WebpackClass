const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname,"dist"),
        // filename le pone el nombre al archivo final
        filename:"[name][contenthash].js",
        // EL NOMBRE DEL ARCHIVO FINAL,
        assetModuleFilename:'assets/images/[hash][ext][query]'
    },
    resolve:{
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions:[".js"],
        alias: {
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/assets/images/')
        }
    },
    //modulo que tiene un objeto
    module:{
        //que tiene unas reglas pra establecer  un arreglo donde voy a tener
        //distintas configuraciones dependiendo de lo que le agregue a esas variables
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader','stylus-loader'],
            },
            {
                test: /\.png/,
                type:'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:10000,
                        // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                        // Especifica el tipo MIME con el que se alineará el archivo. 
                        // Los MIME Types (Multipurpose Internet Mail Extensions)
                        // son la manera standard de mandar contenido a través de la red
                        mimetype:"application/font-woff",
                        // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                        // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                        name: "[name].[contenthash].[ext]",
                        // ubuntu-regularhola.woff
                        outputPath:"./assets/fonts/",
                        // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                        publicPath: "../assets/fonts/",
                         // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                         esModule:false
                         // AVISAR EXPLICITAMENTE SI ES UN MODULO
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            inject:true,
            template:'./public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname,"src",'assets/images'),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin()
        //INSTANCIAMOS EL PLUGIN
    ],
    optimization: {
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}