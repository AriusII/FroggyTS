// We import express and init a new Account route
import express from 'express';

const routeCharacters = express.Router();

// We import the Characters controller
import * as CharactersController from '../controllers/controller.Characters';

// We import the middlewares
import { badRoutesRequestHandler } from '../middlewares/badRoutesRequest.hander';
import { unknownRoutesHandler } from '../middlewares/unknownRoutes.hander';

// We define the routes for the Characters resources
routeCharacters.get('/all/:accountid', CharactersController.getAllCharacters);
routeCharacters.get('/:guid', CharactersController.getCharactersByGuid);
routeCharacters.get('/discord/:discordid', CharactersController.getCharactersByDiscordId);

// We define the bad routes handler
routeCharacters.all('/', badRoutesRequestHandler);
routeCharacters.all('/:id', badRoutesRequestHandler)

// We define the unknown routes handler
routeCharacters.all('*', unknownRoutesHandler);

// We export the route
export default routeCharacters;