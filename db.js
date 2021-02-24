require('dotenv').config();
const mysql = require('mysql');

/*
*** Create mySQL connection
*/
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db4free.net',
    user: 't9tohe00',
    password: process.env.MYSQL_PASSWORD,
    database: 'oamk_opiskelija'
});

module.exports = pool;