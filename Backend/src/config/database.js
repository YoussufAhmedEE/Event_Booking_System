const { Sequelize } = require('sequelize');

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = require('./index.js');

const db = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // important for Neon
    }
  }
});

module.exports = {db};
