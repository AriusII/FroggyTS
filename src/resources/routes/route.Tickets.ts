// We import express and init a new Account route
import express from 'express';

const routeTickets = express.Router();

// We import the Tickets controller
import * as TicketsController from '../controllers/controller.Tickets';

// We import the middlewares
import { badRoutesRequestHandler } from '../middlewares/badRoutesRequest.hander';
import { unknownRoutesHandler } from '../middlewares/unknownRoutes.hander';

// We define the routes for the Tickets resources
routeTickets.get('/all', TicketsController.ticketAll);
routeTickets.get('/:id', TicketsController.ticketById);

// We define the bad routes handler
routeTickets.all('/', badRoutesRequestHandler);

// We define the unknown routes handler
routeTickets.all('*', unknownRoutesHandler);

// We export the route
export default routeTickets;