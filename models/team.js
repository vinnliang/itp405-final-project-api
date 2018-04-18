const bookshelf = require('./bookshelf');

module.exports = bookshelf.Model.extend({
  tableName: 'nfl_team',
  idAttribute: 'team_id'
});
