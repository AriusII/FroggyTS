// import the express module and the cors
import express from 'express';
import cors  from 'cors';

// create a new express application instance
export const expressServer: express.Application = express();

// use CORS to allow cross-origin requests
expressServer.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));

// define app json
expressServer.use(express.json({ limit: '25mb' }));

// define urlencoded size
expressServer.use(express.urlencoded({ limit: '50mb', extended: true }));

// We import all the routes here
import routeAccount from './routes/route.Account';
import routeCharacters from './routes/route.Characters';
import routeTickets from './routes/route.Tickets';

// We use the routes here based on /api/v1 path.
expressServer.use('/api/v1/account', routeAccount);
expressServer.use('/api/v1/characters', routeCharacters);
expressServer.use('/api/v1/tickets', routeTickets);

// We export the server to be used in the index.ts file
export default expressServer;