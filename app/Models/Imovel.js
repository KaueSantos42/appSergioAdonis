'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Imovel extends Model {

    user(){
        return this.belongsTo('App/Models/User');
    }
    
    fotos(){
        return this.hasMany('App/Models/Imagem');
    } 


}

module.exports = Imovel

