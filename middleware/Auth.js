const jwt = require("jsonwebtoken");

exports.authetication = async (req, res, next) => {
    try{
        token = req.header["authetication"].split(" ");
        if (token[1] !== null){
            tokenData = await jwt.verify(token[1], process.env.CRYPTO_SECRET);
            req.body.authtoken = tokenData;
            next()
        }
        else{
           
        }
    }
    catch(err){
        return res.status(403).json({
            status: "failed",
            results: err
        })
    }
}


