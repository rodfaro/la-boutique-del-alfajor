import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export function verificarAcceso(req, res, next){
    const token = req.signedCookies['token'];
    const JWT_SECRETKEY = process.env.JWT_CLAVESECRETA;
    //console.log(token);
    jwt.verify(token, JWT_SECRETKEY, function(error, decoded){
        if(error){
            return res.redirect('/login');
        }
        
        next();
    })
}