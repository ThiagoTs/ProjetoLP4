var mysql = require('mysql');

function createDbConnection(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'lp4'
    });
};
module.exports = function(){
    return createDbConnection();
}