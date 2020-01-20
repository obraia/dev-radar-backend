const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const routes = Router();

//Métodos http --> get, post, put, delete

// --> Tipos de parâmetros:
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/dev/update', DevController.update);
routes.delete('/dev/delete', DevController.destroy);

routes.get('/search', SearchController.index);


module.exports = routes;