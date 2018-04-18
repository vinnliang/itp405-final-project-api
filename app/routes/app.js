const express = require('express');
//const knex = require('knex');
const bodyParser = require('body-parser');
const app = express();
let bookshelf = require('bookshelf');
bookshelf = bookshelf(connect());

// function connect()
// {
//   let connection = knex(
//     {
//         client:'sqlite3',
//         connection:
//         {
//             filename:'./database.sqlite'
//         }
//     });
//
//     return connection;
// }

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('We are live on ' + port);
});
