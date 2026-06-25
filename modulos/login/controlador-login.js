import * as modelo from '../login/modelo-login.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

export async function verificarLogin(req, res){
    try
    {
        const {usuario, passw} = req.body //obtenemos los datos

        const resultado = await modelo.verificarLogin(usuario);
        
        // Datos correctos
        if(resultado.rowCount > 0){
            const passwHashed = resultado.rows[0].password_hash;
            
            //retorna true o false si coincide o no
            const validado = await bcrypt.compare(passw, passwHashed);
            
            //si no coincide  retornar al login con error
            if(!validado){
                return res.redirect('/login?error=Datos+incorrectos');
            }

            //Si llega hasta este punto Coinciden los datos
            //Crear jwt
            const JWT_CLAVESECRETA = process.env.JWT_CLAVESECRETA;

            const token = jwt.sign({usuario: usuario}, JWT_CLAVESECRETA, {expiresIn: '1h'});

            //crear cookie donde se guardara el jwt
            res.cookie('token', token, {
                //secure: true,
                httpOnly: true,
                sameSite: 'lax',
                signed: true
            });

            res.redirect('/admin');
            
        }
        else{
            return res.redirect('/login?error=Datos+incorrectos');
        }
    }
    catch(error){
        console.log(error);
        throw new Error('Ha ocurrido un error en el login.');
    }
}