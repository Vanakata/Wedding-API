const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
               
    if (!req.headers.authorization) {
        return res.status(401).end()
    }
    console.log(req.headers.authorization);
    
    const token = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
    
    console.log(token);
    
    return jwt.verify(token, 'dv3 k3ba43ta 3a m3z3', (err, decoded) => {
=======

    return jwt.verify(token, '', (err, decoded) => {
>>>>>>> a3e0b5dcf1566d11d9cb5f3afb87803d0f90b508
        
        if (err) {
                        
            return res.status(401).end();
        }
        const userId = decoded.sub

        User.findById(userId)
        .then(user=>{
            if(!user){
                return res.status(401).end()
            }
            req.user = user;
            return next();
        })
    })
}
