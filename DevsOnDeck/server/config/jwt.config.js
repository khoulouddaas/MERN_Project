const jtw = require('jsonwebtoken')

module.exports = {

    authenticateDev: (req, res, next)=>{
        jtw.verify(req.cookies.devtoken,
            `${process.env.JWT_SECRET}`,
            (err, payload)=> {
                if(err){
                    console.log("Woops-------Is there a cookie?")
                    console.log(err);
                    res.status(401).json({verified: false})
                }
                else{
                    console.log(payload);
                    req.jwtpayload = payload
                    next()
                }
            }
            )
    },
    
    authenticateCompany: (req, res, next)=>{
        jtw.verify(req.cookies.companytoken,
            `${process.env.JWT_SECRET}`,
            (err, payload)=> {
                if(err){
                    console.log("Woops-------Is there a cookie?")
                    console.log(err);
                    res.status(401).json({verified: false})
                }
                else{
                    console.log("This is the payload:", payload);
                    req.jwtpayload = payload
                    next()
                }
            }
            )
    },

}