const jwtUtils = require('./jwtUtils');

// Authenticate requests
const authenticateToken = ( request, response, next ) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if ( !token ) {
        return response.status( 401 ).send({ error: 'Access denied. Token missing' });
    }

    try {
        const decodedToken = jwtUtils.verifyToken(token);
        request.user = decodedToken;
        next();
    } catch (error) {
        return response.status( 403 ).send( { error: 'Invalid token' } )
    }
}

module.exports = authenticateToken;