/// this webpack configuration will allow us to use the env variables 
//into React.. RDR 
const webpack=require("webpack");
const dotenv = require ("dotenv");

module.exports = () => {
    //we call here the dotenv to return the object with a parsed key 
    const env = dotenv.config().parsed
    // reduced object
    const envKeys = Object.keys(env).reduce((prev,next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {} );
    //returning the plug in 
    return {
        plugins: [
            new.webpack.DefinePlugin(envKeys)
        ]
    }
}
