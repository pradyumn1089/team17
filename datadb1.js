var mysql = require('mysql');


var con=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"feedback"

});

con.connect(function(err)
{
if(err)throw err;
console.log("connected");
var sql="CREATE TABLE feedbacks(name varchar(10),email varchar(30),response varchar(200))";

con.query(sql,function(err,result)
{
if(err) throw err;
console.log("table created");
});
});
