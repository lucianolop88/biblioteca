const mysql = require('mysql2');

module.exports = ()=>{
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'biblioteca_34211309'
    });
};