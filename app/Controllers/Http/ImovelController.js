'use strict'

const Imovel = require('../../Models/Imovel')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Imovel = use('App/Models/Imovel')

/**
 * Resourceful controller for interacting with imovels
 */
class ImovelController {
  /**
   * Show a list of all imovels.
   * GET imovels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({request}) {
    
    const {latitude, longitude} = request.all();


    const imoveis = await Imovel.query().Proximidade(latitude, longitude, 15).fetch();

    return imoveis;
  }

  
  /**
   * Create/save a new imovel.
   * POST imovels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {

    const {id} = auth.user_id;
    const data = request.only(['descricao','endereco','valor','latitude','longitude']);
    
    const imovel = await Imovel.create({...data, user_id: id});
    
    return imovel
  }

  /**
   * Display a single imovel.
   * GET imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {

    const imovel = await Imovel.findOrFail(params.id);
    const data = request.only(['descricao','endereco','valor','latitude','longitude']);
    
    imovel.merge(data);
    await imovel.save();
    
    return imovel;
  }


  /**
   * Update imovel details.
   * PUT or PATCH imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {

    const imovel = await Imovel.findOrFail(params.id);



    return imovel

  }

  /**
   * Delete a imovel with id.
   * DELETE imovels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, response, auth }) {
    
    const imovel = await Imovel.findOrFail(params.id);

    if(imovel.user_id !== auth.user.id){
      return response.status(401).send({error: 'voce nao tem autorizacao!'})
    }
    
    await imovel.delete();
  }
}

module.exports = ImovelController
