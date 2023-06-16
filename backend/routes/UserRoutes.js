const router = require('express').Router();
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwtUtils = require('../middlewares/jwtUtils');
const authenticateToken = require('../middlewares/auth');


// GET Endpoint

// gets all user
router.get( '/', authenticateToken, ( request, response ) => {
    User.find().then( data => {
        response.status( 200 ).send( { users: data } )
    });
})

// gets specific user
router.get( '/:username', ( request, response) => {
    
    // Finds scpecific board from the database
    User.findOne( { username : request.params.username } )
    .then ( dbResponse => {
        if ( dbResponse ) {
            return response.status( 200 ).send( { user: dbResponse } )
        } else {
            return response.status( 404 ).send( { error: 'User not found!' } )
        }
    })
})


// POST Endpoint

// Register new user
router.post( '/register', ( request, response ) => {
    const { username, email, password } = request.body;
  
    // Check if the username or email already exists in the database
    User.exists( { $or: [ { username }, { email } ] } )
      .then(( exists ) => {
        if ( exists ) {
          return response.status( 400) .send( { error: 'Username or email should be unique' } );
        }
  
        // Hash the password using bcrypt
        bcrypt.genSalt( 10, ( error, salt ) => {
          if ( error ) {
            return response.status( 500 ).send( { error: 'Error generating salt' } );
          }
  
          bcrypt.hash( password, salt, ( error, hashedPassword ) => {
            if (error) {
              return response.status( 500 ).send( { error: 'Error hashing password' } );
            }
  
            // Create a new User instance with the hashed password
            const newUser = new User({
              username,
              email,
              password: hashedPassword,
            });

            // Save the user to the database
            newUser
              .save()
              .then(( savedUser ) => {

                // generate token
                const token = jwtUtils.generateToken( savedUser.username );

                response.status( 201 ).send( { message: "User created successfully", token } );
              })
              .catch(( error ) => {
                console.log(error)
                response.status( 500 ).send( { error: 'Failed to register user' } );
              });
          });
        });
      })
      .catch( ( error ) => {
        response.status( 500 ).send( { error: 'Error checking username and email availability' } );
      });
});

//   login user
router.post( '/login', ( request, response ) => {
    const { username, password } = request.body;

    // find user by the username input
    User.findOne( { username } )
        .then(( user ) => {
            if ( !user ) {
                return response.status( 404 ).send( { error: "User not found" } );
            }

            // compare password input with the hashed password
            bcrypt.compare( password, user.password, ( error, isMatch) => {
                if ( error ) {
                    return response.status( 500 ).send( { error: 'Cannot compare password' } )
                }

                if ( isMatch ) {
                    response.status( 200 ).send( { message: "Login Successful" } );
                } else {
                    response.status( 401 ).send( { error: 'Incorrect password' } )
                }
            });
        })
        .catch(( error ) => {
            response.status( 500 ).send( { error: 'Cannot find user' } )
        })
})


// PUT Endpoint

// update user
// router.put( '/:username', ( request, response ) => {
//     const { username } = request.params;
//     const { email, password } = request.body;

//     // find user with the username input
//     User.findOne( { username } )
//         .then(( user ) => {
//             if ( !user ) {
//                 return response.status( 404 ).send( { error: "User not found" } );
//             }
//         })

//         // update user info

// })

// DELETE Endpoint

// delete user



module.exports = router;