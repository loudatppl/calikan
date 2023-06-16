const router = require('express').Router();
const Card = require('../models/CardModel');
const { v4: uuidv4 } = require('uuid');


// GET Endpoint

// get all cards
router.get( '/', ( request, response ) => {
    const { boardId } = request.query;
    const query = { sourceBoard: boardId }

    Card.find(query)
        .then(( cards ) => {
        response.status( 200) .send( { cards: cards } );
        })
        .catch((error) => {
        response.status( 500 ).send( { error: 'Error fetching cards' });
        });
})

// get specific card
router.get( '/:cardId', ( request, response) => {
    
    // Finds scpecific board from the database
    Card.findOne( { cardId : request.params.cardId } )
    .then ( dbResponse => {
        if ( dbResponse ) {
            return response.status( 200 ).send( { card: dbResponse } )
        } else {
            return response.status( 404 ).send( { error: 'Card not found!' } )
        }
    })
})


// POST Endpoint 

// create card
router.post( '/', ( request, response ) => {
    const { cardId, task, status, sourceBoard } = request.body;

    // new card object
    const newCard = new Card({
        cardId: uuidv4(),
        task,
        status,
        sourceBoard
    });

    // save card on db
    newCard.save()
        .then( () => {
            response.status( 201 ).send( { message: 'Card created successfully' } )
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot create card' } )
        } )
})


// PUT Endpoint

// update/edit card
router.put( '/:cardId', ( request, response ) => {
    const { cardId } = request.params;
    const { task, status } = request.body;

    // find and update the specified card
    Card.findOneAndUpdate( { cardId }, { task, status }, { new: true }) /*  ensures that the updated card object, reflecting the changes made, is returned as the response. */
        .then( ( updatedCard ) => {
            if ( !updatedCard ) {
                return response.status( 404 ).send( { error: 'Card not found' });
            }
            response.status( 200 ).send( { message: 'Card updated successfully', card: updatedCard });
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot update card' } )
        })
})


// DELETE Endpoint

// delete a card 
router.delete( '/:cardId', ( request, response ) => {
    const { cardId } = request.params;

    // find and delete the specified card
    Card.findOneAndDelete( cardId, { deleted: true } )
        .then(( deletedCard ) => {
            if ( !deletedCard ) {
                return response.status( 404 ).send( { error: 'Card not found' } );
            }

            response.status( 200 ).send( { message: 'Card deleted successfully' } );
        })
        .catch( ( error ) => {
            response.status( 500 ).send( { error: 'Cannot delete card' } );
        })
})


module.exports = router;