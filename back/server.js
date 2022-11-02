const express = require('express');

let currentTeam = [];
let savedTeams = []

const app = express(),
    bodyParser = require("body-parser"),
    port = 2001;

app.use(bodyParser.json());


app.post('/clientApi/currentTeam', (req, res) => {
    if (currentTeam.length < 6) {
        currentTeam.push(req.body.monData);
    } else {
        currentTeam = currentTeam.slice(0, -1);
        currentTeam.push(req.body.monData);
    }
})

app.get('/clientApi/currentTeam', (req,res) => {
    res.json(currentTeam);
})

app.delete('/clientApi/currentTeam', (req,res) => {
    currentTeam.length = 0;
})

app.get('/clientApi/savedTeams', (req,res) => {
    res.json(savedTeams);
})

app.post('/clientApi/savedTeams', (req,res)=> {
    savedTeams.push(req.body.newTeam)
    currentTeam.length = 0;
})

app.delete('/clientApi/savedTeams', (req,res) => {
    savedTeams.length = 0;
})

app.post('/clientApi/savedTeams/deleteTeam', (req,res) => {
    savedTeams = savedTeams.filter((item) => {
        return item.teamName !== req.body.team.teamName;
      })
})

app.listen(port, () => {
    console.log("Listening to port 2001...")
})

