const express = require('express');
const server = express();
const projects = require("./api/projects")
const actions = require("./api/actions")

server.use(express.json())
server.use("/api/actions", actions)
server.use("/api/projects", projects)

server.get('/', (req, res) => {
  res.send(`<h1>Welcome to my server!</h1>`);
});

module.exports = server;