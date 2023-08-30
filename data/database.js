const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'nodejs',
    database: 'myshop',
    password: 'password'
});

module.exports = pool.promise();
