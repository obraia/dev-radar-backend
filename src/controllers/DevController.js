const axios = require('axios');
const Dev = require('../models/Dev');
const stringSplit = require('../utils/splitString');

// --> Funções comuns ao Controller
// index: mostrar lista de recursos
// show: mostrar um único recurso
// store: armazenar um novo recurso
// update: atualizar um recurso
// destroy: deletar um recurso

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    
    if (!dev) {
      apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      let { name, bio, avatar_url } = apiResponse.data;
      
      if (name == null) name = github_username;
      
      const arrayTechs = stringSplit(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: arrayTechs,
        location,
      });
    }

    return response.json(dev);
  },

  async update(request, response) {
    const { github_username, name, bio, avatar_url, techs, latitude, longitude } = request.body;

    const arrayTechs = stringSplit(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }

    let dev = await Dev.updateOne(
      { "github_username": github_username },

      {
        $set: {
          name,
          bio,
          avatar_url,
          techs: arrayTechs,
          location
        }
      }
    );

    return response.json(dev);
  },

  async destroy(request, response) {
    const { github_username } = request.query;

    console.log('Deletar:', request.query);

    const devs = await Dev.deleteOne({
      github_username: {
        $eq: github_username
      }
    })

    return response.json(devs);
  },
}

