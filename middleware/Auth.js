const jwt = require("jsonwebtoken");

exports.authetication = async (req, res, next) => {
    try{
        token = req.headers["authorization"]?.split(" ");
        console.log("entered 1")
        if (token){
            tokenData = await jwt.verify(token[1], process.env.CRYPTO_SECRET);
            console.log(tokenData);
            req.body.authtoken = tokenData;
            next()
        }
        else{ 
           throw "no token found"
        }
    }
    catch(err){
        return res.status(403).json({
            status: "failed",
            results: err
        })
    }
}


