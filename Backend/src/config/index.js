require('dotenv').config(); 

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD,PORT } = process.env;
module.exports = {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PORT
};