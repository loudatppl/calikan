const express = require( 'express' );
const cors = require( 'cors' );
const bodyParser = require( 'body-parser' );
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');


// Server
const server = express();
const PORT = 8000;


server.use( cors() );
server.use( bodyParser.json() );
server.use( helmet() );
dotenv.config()


// Mongoose Config
mongoose.connect(process.env.MONGODB_URI)


// Routes
const userBaseUrl = '/api/v1/users';
const boardBaseUrl = '/api/v1/boards';
const cardBaseUrl = '/api/v1/cards';

const UserRoutes = require( './routes/UserRoutes' );
const BoardRoutes = require( './routes/BoardRoutes' );
const CardRoutes = require( './routes/CardRoutes' );

server.use( userBaseUrl, UserRoutes );
server.use( boardBaseUrl, BoardRoutes );
server.use( cardBaseUrl, CardRoutes );


server.get('/', ( request, response ) => {
    response.send({ message: `Welcome to CaliKan`})
});


server.listen( PORT, () => {
    console.log( `server actively running on port ${PORT}` );
});




