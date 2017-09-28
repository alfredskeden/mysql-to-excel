const { HOST, USER, PASS} = require('./config');
if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('strukturunderlag-frazer.xlsx');

console.log(workbook);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : HOST,
  user     : USER,
  password : PASS,
  database : 'test_server_tm'
});
 
connection.connect();
 
var query = connection.query('SELECT * FROM af_products WHERE disable_se=0', function(error, results, fields){
    if (error) throw error;

    //console.log(results[0].name_se);
});

 
connection.end();