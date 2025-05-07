require('dotenv').config(); 

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD,PORT ,HASH_SALT_ROUNDS,JWT_SECRET
} = process.env;


module.exports = {
    PGHOST,
    PGDATABASE,
    PGUSER,
    PGPASSWORD,
    PORT,
    HASH_SALT_ROUNDS,
    JWT_SECRET
};