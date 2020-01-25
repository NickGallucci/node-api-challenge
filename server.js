const express = require('express');
const server = express();
const projects = require("./api/projects")
const actions = require("./api/actions")
// publicDir = require('path').join(__dirname,'/html/index.js');

server.use(express.json())
server.use("/api/actions", actions)
server.use("/api/projects", projects)

// server.get('/', (req, res) => {
//   res.sendFile('./html/index.html', { root: __dirname );
// });

module.exports = server;

// publicDir = require('path').join(__dirname,'/public');
// server.use(express.static(publicDir));