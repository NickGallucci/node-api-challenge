const express = require('express');
const projectDb = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get()
    res.status(200).json(projects)
  }
  catch{
    res.status(500).json({ error: "Could not retreive any data!"})
  }
});

router.post('/', async (req, res) => {
  const newPost = { ...req.body, id: req.params.id}
    try{
    const success = await projectDb.insert(newPost)
    res.status(201).json(success)
  }
  catch{
    res.status(500).json({ error: "Failed adding new user!"})
  }
});

router.put('/:id', async (req, res) => {
  try {
    await projectDb.update(req.params.id, { ...req.body, id: req.params.id })
    const newResult = await projectDb.getById(req.params.id)
    res.status(200).json(newResult)
  }
  catch {
    res.status(500).json({ error: "Update/Edit FAILED!"})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await projectDb.remove(req.params.id)
    res.status(200).json({ status: `User Id: ${result} has been deleted`})
  }
  catch {
    res.status(500).json({ error: "Could not delete user!"})
  }
});

module.exports = router;