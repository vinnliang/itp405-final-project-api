const express = require('express');
const knex = require('knex');
const app = express();
const Player = require('./models/player');
const Team = require('./models/team');
const PlayerStats = require('./models/player_stats');
const connect = ('./models/connect');
const sqlite3 = require('sqlite3').verbose();
const SqlString = require('sqlstring');

app.get('/api/teams', function(req, res) {
  Team.fetchAll().then(function(teams) {
    res.json(teams);
  });
});

app.get('/api/teams/:id', function(req, res) {
  let id = req.params.id;
  let team = new Team({ team_id: id });
  team.fetch()
    .then(function(teams) {
      if (!teams) {
        throw new Error(`Team ${id} not found`);
      } else {
        res.status(200).json(teams);
      }
    })
    .catch(function(error) {
      res.status(404).json({
        error: error.message
      });
    });
});

app.post('/api/playerstats/:id', function(req, res) {
  let id = req.params.id;
  let playerStats = new PlayerStats({ player_id: id });
  playerStats.fetch()
    .then(function(playerStats) {
      if (!playerStats) {
        throw new Error(`No stats for player of ID ${id} found`);
      } else {
        res.status(200).json(playerStats);
      }
    })
    .catch(function(error) {
      res.status(422).json({
        error: error.message
      });
    });
});


app.post('/api/teams', function(req, res)
{
  //SqlString validates and sanitizes our sql statement
  var sql = SqlString.format(`INSERT INTO nfl_team (team_id, team_name) VALUES (?, ?);`, [newTeamId, newTeamName]);
  let db = new sqlite3.Database('./database.sqlite');
  db.run(sql, function(err, result)
  {
    if (err)
    {
      console.error(err);
      res.statusCode = 422;
      return res.json({
        errors: ['Failed to create new NFL Team']
      });
    }
    res.statusCode = 201;
    Team.fetchAll().then(function(teams) {
      res.json(teams);
    });
  });
});

app.patch('/api/players/:id', function(req, res)
{
  let id = req.params.id;
  //SqlString validates and sanitizes our sql statement
  var sql = SqlString.format(`UPDATE players SET team_id = ?, age = ?, nfl_experience = ?, isPracticeSquad = ?, jerseyNumber = ? WHERE player_id = ?`,
                            ['21', '29', '10', 'N', '85', id]);
  let db = new sqlite3.Database('./database.sqlite');
  db.run(sql, function(err, result)
  {
    if (err)
    {
      console.error(err);
      res.statusCode = 422;
      return res.json({
        errors: ['Failed to update Player details']
      });
    }
    res.statusCode = 201;
    let player = new Player({ player_id: id });
    player.fetch()
      .then(function(player) {
        if (!player) {
          throw new Error(`No stats for player of ID ${id} found`);
        } else {
          res.json(player);
        }
      })
    })
    .catch(function(error) {
      res.status(422).json({
        error: error.message
      });
    });
});


app.delete('/api/players/:id', function(req, res)
{
    let id = req.params.id;
    let player = new Player({ player_id: id });
    player.destroy().then(function(player)
    {
      if (!player) {
        throw new Error(`No records for player of ID ${id} found`);
      } else {
        res.status(200).json('Player records deleted');
      }
    }).catch(function(error) {
        res.status(422).json({
        error: error.message
      });
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('We are live on ' + port);
});
