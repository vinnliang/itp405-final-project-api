const bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'players',
  idAttribute: 'player_id'
});
