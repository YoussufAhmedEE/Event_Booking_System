const { db } = require('../models/associations'); 
const erd = require('sequelize-erd');

erd({ source: db }).then(svg => {
  require('fs').writeFileSync('ERD/diagram.svg', svg);
});
