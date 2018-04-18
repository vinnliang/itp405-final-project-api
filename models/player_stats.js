const bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'player_stats',
  idAttribute: 'player_id'
});
