require('dotenv').config();
const mysql = require('mysql');

/*
*** Create mySQL connection
*/
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysli.oamk.fi',
    user: 't9tohe00',
    password: process.env.MYSQL_PASSWORD,
    database: 'opisk_t9tohe00'
});

module.exports = pool;