// We import express and init a new Account route
import express from 'express';

const routeAccount = express.Router();

// We import the Account controller
import * as accountController from '../controllers/controller.Account';

// We import the middlewares
import { badRoutesRequestHandler } from '../middlewares/badRoutesRequest.hander';
import { unknownRoutesHandler } from '../middlewares/unknownRoutes.hander';

// We define the routes for the Account resources
routeAccount.post('/add', accountController.accountAdd);
routeAccount.post('/discord/login', accountController.accountLoginDiscord);
routeAccount.get('/discord/:discordId', accountController.accountDiscord);
routeAccount.get('/access/:id', accountController.accountAccess);
routeAccount.get('/character/:guid', accountController.accountCharacter);

// We define the bad routes handler
routeAccount.all('/', badRoutesRequestHandler);
routeAccount.all('/:id', badRoutesRequestHandler);

// We define the unknown routes handler
routeAccount.all('*', unknownRoutesHandler);

// We export the route
export default routeAccount;