const Db = require('../data/helpers/actionModel');
const express = require('express');
const router = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params
    Db
        .get(id)
        .then(action => {
            if (action) {
                req.action = action
                next()
            } else {
                res.status(400).json({ error: 'Not possible' })
            }
        })
        .catch(error => res.status(500).json({ error: 'Not able to retrieve action', error }))
}

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params
    Db.get(id)
    .then(info => res.status(200).json(info))
    .catch(error => res.status(500).json({ errorMessage: 'Nothing was Retrieved', error }))
})

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params
    Db
        .remove(id)
        .then(() => res.status(200).json(`${req.action.description} was deleted`))
        .catch(error => res.status(500).json({ errorMessage: 'Could not delete the action', error }))
})

const validateAction = (req, res, next) => {
    const { description } = req.body

    if (!req.body) {
        res.status(400).json({ error: 'No info listed!' })
    } else if (!description) {
        res.status(400).json({ error: 'Missing description!' })
    } else if (description.length > 128){
        res.status(400).json({ error: 'Description is too long!'})
    } else {
        next()
    }
}

router.put('/:id', validateId, validateAction, (req, res) => {
    const { id } = req.params
    const changes = req.body
    Db
        .update(id, changes)
        .then(() => res.status(200).json(`${req.action.description} was updated`))
        .catch(error => res.status(500).json({ errorMessage: 'Error during update!', error }))
})


module.exports = router