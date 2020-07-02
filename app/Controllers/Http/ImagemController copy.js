'use strict'

const Imovel = use('App/Models/Imovel');
const Helpers = use('Helpers');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */



/**
 * Resourceful controller for interacting with imovels
 */
class ImagemController {

  async store ({ request, params}) {

    const imovel = await Imovel.findOrFail(params.id);

    const imagens = request.file('image', {
      types: ['image'],
      size: '5mb'
    });

    await imagens.moveAll(Helpers.tmpPath('uploads'), file => ({
      name: `${Date.now()}-${file.clientName}`
    }));

    if(!imagens.movedAll()){
      return imagens.errors();
    }
  }


  async show ({ params, response }) {

    const imagem = await Imovel.findOrFail(params.id);

    return response.download(Helpers.tmpPath(`upload/${params.caminho}`));
  }
  
}

module.exports = ImovelController
