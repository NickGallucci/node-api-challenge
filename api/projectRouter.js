const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');
const router = express.Router();

const validateId = (req, res, next) => {
    const { id } = req.params
    projectDb
        .get(id)
        .then(project => {
            if(project){
                req.project = project
                next()
            }else{
                res.status(400).json({ error: "Project doesn't exist." })
            }
        })
        .catch(error => res.status(500).json({ error: "Could not retrieve the project." }))
}

const validateProject = (req, res, next) => {
    const {name, description} = req.body
        if(!req.body) {
            res.status(400).son({ error: "No info listed!" })
        } else if (!description) {
            res.status(400).json({ error: 'Missing description!' })
        } else if (description.length > 128){
            res.status(400).json({ error: 'Description is too long!'})
        } else if (!notes){
            res.status(400).json({ error: 'Missing notes!' })
        } else {
            next()
        }
}

const validateAction = (req, res, next) => {
    const { description, notes } = req.body

        if (!req.body) {
            res.status(400).json({ error: 'No info listed!!' })
        } else if (!description) {
            res.status(400).json({ error: 'Missing description!' })
        } else if (description.length > 128){
            res.status(400).json({ error: 'Description too long!'})
        } else if (!notes){
            res.status(400).json({ error: 'Missing notes!' })
        } else {
            next()
        }
}

router.get('/', (req, res) => {
    projectDb
        .get()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to retrieve projects', error }))
})

router.get('/:id', validateId, (req, res) => {
    const { id } = req.params
    projectDb
        .get(id)
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to retrieve project', error }))
})

router.get('/:id/actions', validateId, (req, res) => {
    const { id } = req.params
    projectDb
        .getProjectActions(id)
        .then(actions => res.status(200).json(actions))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to retrieve project\'s actions', error }))
})

router.delete('/:id', validateId, (req, res) => {
    const { id } = req.params
    projectDb
        .remove(id)
        .then(() => res.status(200).json(`${req.project.name} was deleted`))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to delete Project', error }))
})

router.put('/:id', validateId, (req, res) => {
    const { id } = req.params
    const body = req.body
    projectDb
        .update(id, body)
        .then(() => res.status(200).json(`${req.project.name} was updated`))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to update Project', error }))
})

router.post('/', validateProject, (req, res) => {
    projectDb
        .insert(req.body)
        .then(project => res.status(201).json(project))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to create new project', error }))
})

router.post('/:id/actions', validateId, validateAction, (req, res) => {
    const { id } = req.params
    const { description, notes } = req.body
    actionDb
        .insert({description, notes, project_id: id})
        .then(action => res.status(201).json(action))
        .catch(error => res.status(500).json({ errorMessage: 'Server was unable to create new action', error }))
})


module.exports = router;