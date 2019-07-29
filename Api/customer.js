var connection = require('../config');
const express = require('express');
const router = express.Router();

router.post('/addcustomer',function(req,res){
  var customers={
    "cname":req.body.cname,
    "organization":req.body.organization,
    "email":req.body.email,
    "contactno":req.body.contactno,
    "address":req.body.address,
    "details":req.body.details,
    "type":req.body.type
    }
      connection.query('insert into customers set ?',customers, function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
        }else{
            res.json({
  
              status:true,
              data:results,
              message:'Customer added sucessfully'
          })
        }
      });
});

router.get('/getcustomer', function(req,res){
  connection.query('select * from customers',(error,rows,fields)=>{
    if (!error)
      res.send(rows);
      else
      console.log(error);
  });
});

router.get('/getcustomer/:cid', (req,res)=>{
  connection.query('select * from customers where cid= ?',[req.params.cid],(error,rows,fields)=>{
    if (!error)
      res.send(rows);
      else
      console.log(error);
  });
});

router.put('/updatecustomer/:cid', (req,res)=>{
 let sql=`update customers set cname= '${req.body.cname}',email='${req.body.email}' where cid= '${req.params.cid}'`;
  connection.query(sql,(error,rows,fields)=>{
    if (!error)
      res.send('Updated successfully');
      else
      console.log(error);
  });
});

router.delete('/deletedata/:cid', (req,res)=>{
  connection.query('delete from customers where id= ?',[req.params.id],(error,rows,fields)=>{
    if (!error)
      res.send('Customer deleted successfully');
      else
      console.log(error);
  });
});

module.exports = router;