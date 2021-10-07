var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

   var con = mysql.createConnection({
  localhost: "localhost",
  user: "root",
  password: "",
  database: "feedback"
});

app.get('/send', function (req, res) {
var rr="<html>";
rr = rr+"<body  >";

rr=rr+"<form method='post' action='thank'  >";

rr=rr+"<border=10px><center><u><h1>WELCOME!!</u></h1></center>";
rr=rr+"<center><h1><u>Please fill the form for feedback</u></h1></center>";

rr = rr+"<br><br><center> NAME "+"<input type='text' name='name' value=''></center><br>";

rr = rr+"<center> EMAIL "+"<input type='text' name='email' value=''></center><br>";

rr = rr+"<center> FEEDBACK "+"<input type='text' name='response' value=''></center><br>";

rr = rr+"<center><input type='submit' name='t1' value='Submit'></center>";
rr = rr+"</form>";
rr = rr+"</body>";
res.send(rr);

  
})
app.post('/thank', urlencodedParser, function (req, res){
  var reply='';
  name = req.body.name;
  email =req.body.email;
  response = req.body.response;
 
  
var sql = "INSERT INTO feedbacks VALUES('"+name+"','"+email+"','"+response+"')";
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.query(sql, function (err, result) {
 if (err) throw err; 
  console.log("rec inserted");
  
 });


var rr="<html>";
rr = rr+"<body>";
rr=rr+"<form  method='post' action='next' >";
rr=rr+"<center><br><h1>STATUS</h1><br></center>";
rr=rr+"<center><br><h1>THANK YOU FOR YOUR FEEDBACK</h1><br></center>";
rr = rr+"<center><input type='submit' name='t2' value='show feedbacks and reviews'></center><br><br>";
rr = rr+"</form>";

rr=rr+"<form  method='post' action='hell' >";
rr = rr+"<center><input type='submit' name='t3' value='services for the feedback'><br></center>";
rr = rr+"</form>";


rr = rr+"</body>";


  res.send(rr);
  //res.write("record inserted");
  res.end();
 })
 
 app.post('/hell', urlencodedParser, function (req, res){ 
  var sql ;
con.query(sql, function (err, result) {
 if (err) throw err; 
  console.log("rec deleted");
		});
	 res.write("our team will reach you out . thank you for your patience toll free number:- 1800 550 022"); 
	 res.send();

 })
 
 
 app.post('/next', urlencodedParser, function (req, res){

  var sql="select * from feedbacks";
  
con.query(sql, function (err, result) {
 if (err) throw err; 
  console.log(result);
  for (i=0; i<result.length; i++)
	{	
  	 res.write(" name : "+result[i].name); 
	 res.write(" email : "+result[i].email); 
	 res.write(" response : "+result[i].response);

	 res.write(" ");
	}
  res.send();

});

  }).listen(8080);