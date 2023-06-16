const router = require('express').Router();
const Board = require('../models/BoardModel');
const { v4: uuidv4 } = require('uuid');


// CRUD Functionalities

// GET Endpoint

// get all boards
router.get( '/', ( request, response ) => {
    const { deletedBoards } = request.query;

    const query = deletedBoards === 'true' ? {} : { deleted: false };

    // if query parameter deletedBoards=true is included, it will return all boards including soft deleted ones
    Board.find(query).then( data => {
        response.status( 200 ).send( { boards: data } )
    });
})

// get specific board
router.get( '/:boardId', ( request, response) => {
    
    // Finds scpecific board from the database
    Board.findOne( { boardId : request.params.boardId } )
    .then ( dbResponse => {
        if ( dbResponse ) {
            return response.status( 200 ).send( { board: dbResponse } )
        } else {
            return response.status( 404 ).send( { error: 'Board not found!' } )
        }
    })
})


// POST Endpoint

// create new board
router.post( '/', ( request, response ) => {
    const { boardId, name, description } = request.body;
    
    // new board object
    const newBoard = new Board({
        boardId: uuidv4(),
        name,
        description,
    });
    
    // save board on the db
    newBoard.save()
        .then( () => {
            response.status( 201 ).send( { message: 'Board created successfully' } )
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot create board' } )
        })
})


// PUT Endpoint

// update/edit 
router.put( '/:boardId', ( request, response ) => {
    const { boardId } = request.params;
    const { name, description } = request.body;

    // find and update a board
    Board.findOneAndUpdate( { boardId }, { name, description }, { new: true }) /*  ensures that the updated board object, reflecting the changes made, is returned as the response. */
        .then( ( updatedBoard ) => {
            if ( !updatedBoard ) {
                return response.status( 404 ).send( { error: 'Board not found' });
            }
            response.status( 200 ).send( { message: 'Board updated successfully', board: updatedBoard });
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot update board' } )
        })
})


// DELETE Endpoint

// delete a baord
router.delete( '/:boardId', ( request, response ) => {
    const { boardId } = request.params;

    // find and delete the specified board
    Board.findOneAndDelete( boardId, { deleted: true } ) 
        .then(( deletedBoard ) => {
            if ( !deletedBoard) {
                return response.status( 404 ).send( { error: 'Board not found' } );
            }

            response.status( 200 ).send( { message: 'Board deleted successfully' } );
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot delete board' } );
        })
})


module.exports = router;