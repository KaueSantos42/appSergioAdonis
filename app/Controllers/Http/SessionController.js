'use strict'

class SessionController {

    async create({request, auth}){

        const {email, password} = request.all(); //pega os valores de email e senha

        const token = await auth.attempt(email,password); //autentica o login

        return token;
    }
}

module.exports = SessionController
