const axios = require('axios');
const Dev = require('../models/dev');
const stringSplit = require('../utils/splitString');

module.exports = {
      async index(request, response) {
            const { latitude, longitude, techs } = request.query;

            const arrayTechs = stringSplit(techs);

            const devs = await Dev.find({
                  techs: {
                        $in: arrayTechs,
                  },
                  location: {
                        $near: {
                              $geometry: {
                                    type: 'Point',
                                    coordinates: [longitude, latitude],
                              },
                              $maxDistance: 10000,
                        },
                  },
            });

            return response.json({ devs });
      }
}