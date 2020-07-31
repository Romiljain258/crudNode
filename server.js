const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.json());
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4741",
  database:"crud",
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
})
//insert in database
 app.get('/insert/:name/:address/:mobileno',(req,res)=>{
    var sql = "INSERT INTO forcrud(name,address,mobileno) VALUES (?,?,?)";
    con.query(sql,[req.body.name,req.body.address,req.body.mobileno], function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

//insert new user by post method
app.post('/postcall',function(req,res){
   const name=req.body.name;
   const address=req.body.address;
   const mobileno=req.body.mobileno;
 
   var sql = "INSERT INTO forcrud(name,address,mobileno) VALUES (?,?,?)";
   con.query(sql,[name,address,mobileno],function(error,results,fields){
       if(error) throw error;
       return res.status(200).send({error:false,data:results,message:"data created succesfuuly"});
   })
})

//get method
app.get('/get/:id',(req,res)=>{
var qu="select * from forcrud where id = ?";
  con.query(qu,[req.body.id],function(err, rows){
      if(err) throw err;
      res.send(rows);
  })
})
 

//update data by put
app.put('/update',function(req,res){
    const name=req.body.name;
   const address=req.body.address;
   const mobileno=req.body.mobileno;
//    const id=req.body.id;

//    if(!id || !name || !address || !mobileno){
//     res.status(400).send({error:true,message:"please insert valid data"});
//    }
   con.query('update forcrud address=?, mobileno=? where name=?',[name,address,mobileno],function(error,results,fields){
    if(error) throw error;
    return res.status(200).send({error:false,data:results,message:"data created succesfuuly"});
})
})
//Router to DELETE a  detail
app.delete('/delete/:name', (req, res) => {
    con.query('DELETE FROM forcrud WHERE name = ?', [req.body.name], (err, rows, fields) => {
    if (!err)
    res.send('Learner Record deleted successfully.');
    else
    console.log(err);
    })
    });

app.listen(3000,(req,res)=>{
    console.log("server is running");
})