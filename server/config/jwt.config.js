const jwt = require("jsonwebtoken");
// const secret = "I can't believe this key is so secret!";
// module.exports.secret = secret;

module.exports = {
    
    authenticate (req, res, next) {
        jwt.verify(req.cookies.userToken, //! note to self: this and other places had "userToken" misspelled as "usertoken"
            process.env.JWT_SECRET, 
            (err, payload) => {
                if (err) { 
                    console.log(err);
                    res.status(401).json({verified: false});
                } 
                else {
                    console.log(payload);   
                    req.jwtpayload = payload
                    next()
                }
            }
            )
    }
};     