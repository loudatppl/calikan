const jwt = require('jsonwebtoken');
const SECRET = 'my-secret-key';


// generate jwt token
const generateToken = ( { username } ) => {
    const payload = { username }
    return jwt.sign( payload, SECRET )
}

// verify and decode JWT token
function verifyToken(token) {
    try {
      const decoded = jwt.verify( token, SECRET );
      return decoded;
    } catch ( error ) {
      return null;
    }
}


module.exports = {
    generateToken,
    verifyToken
};