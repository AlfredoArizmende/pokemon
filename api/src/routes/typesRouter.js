const { Router } = require('express');
const typesRouter = Router();
const { getAllTypesHandler } = require('../handlers/typesHandler');


typesRouter.get('/', getAllTypesHandler);


module.exports = typesRouter;