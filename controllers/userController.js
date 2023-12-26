const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const util = require("util");

const asyncScrypt = util.promisify(crypto.scrypt)

async function EncryptApiKey (apikey, password) {
    try{
        const salt = await crypto.randomBytes(16);
        const key = await asyncScrypt(password, salt, 24);

        const initVector = await crypto.randomBytes(16);
        const cipher = crypto.createCipheriv("aes-192-cbc", key, initVector)

        let encrypted = cipher.update(apikey, 'utf-8', 'hex')
        encrypted += cipher.final('hex') 

        return {encrypted, salt: salt.toString("hex"), initVector: initVector.toString("hex")}

    }
    catch (err){
        console.log(err)
    }
}

async function decryptApiKey(encryptedData, password) {
    const { encrypted, salt, initVector } = encryptedData;
  
    const key = await asyncScrypt(password, Buffer.from(salt, 'hex'), 24); // Derive the key using the original salt
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, Buffer.from(initVector, 'hex'));
  
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
  
    return decrypted;
}
  

exports.Login = async (req, res) => {
    try{
        const dbUser = await User.findOne({username: req.body.username})

        if (dbUser && await bcrypt.compare(req.body.password, dbUser.password)){
            const token = await jwt.sign({ username: dbUser.username}, process.env.CRYPTO_SECRET, {expiresIn: "1d", algorithm: "HS512"})
            const apikey = await decryptApiKey(dbUser.apikey, req.body.password)
            res.status(200).json({ 
                status: "success",
                recevied: {
                    authtoken: token,
                    apikey: apikey
                }
            })
        }
        else{
            throw "Invalid information please try again"
        }
        
    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.Register = async (req, res) => {
    try{
        const newUser = { ...req.body }
        let salt = await bcrypt.genSalt(10)
        newUser.password = await bcrypt.hash(newUser.password, salt)
        if (newUser.apikey){
            newUser.apikey = await EncryptApiKey(newUser.apikey, req.body.password)
        }

        await User.create({
            email: newUser.email,
            username: newUser.username,
            password:newUser.password,
            apikey: newUser.apikey,
            lastsession: Date.now(),
            firstjoined: Date.now(),
            prompts: "add default ones later"
        })
        const token = await jwt.sign({ username: newUser.username}, process.env.CRYPTO_SECRET, {expiresIn: "1d", algorithm: "HS512"})
        res.status(200).json({ 
            status: "success",
            recevied: {
                authtoken: token
            } 
        })

    }catch(err){    
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.PatchUser = async (req, res) => {
    try{
        if(req.body.username === req.body.authtoken.username){
            const dbUser = await User.findOne({username: req.body.username})
            const updates = {};
            for (const key in req.body){
                if (key === "prompts")
                    updates[key] = req.body[key];
                else if (key === "apikey"){
                    if (!req.body.password)
                        throw "password must be supplied"
                    if (!dbUser.password)
                        throw "problems with the user"
                    if (!await bcrypt.compare(req.body.password, dbUser.password))
                        throw "bad password"
                    updates.apikey = await EncryptApiKey(req.body.apikey, req.body.password)
                }

            }
            updatedDoc = await User.findOneAndUpdate({username: req.body.username}, updates, {
                new: true
            });
            res.status(200).json({ 
                status: "success",
                results: updatedDoc
            })
        }else{
            throw "Trying to delete someone else huh? i logged your data ;D"
        }

    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}

exports.DeleteUser = async (req, res) => {
    try{
        if(req.body.username === req.body.authtoken.username){
            await User.deleteOne({username: req.body.username})
            res.status(200).json({ 
                status: "success",
            })
        }else{
            throw "Trying to delete someone else huh? i logged your data ;D"
        }
    }catch(err){
        res.status(500).json({
            status: "failed",
            results: err
        })
    }
}