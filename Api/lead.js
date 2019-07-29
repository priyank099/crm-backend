var connection = require('../config');
const express = require('express');
const router = express.Router();

router.post('/addlead',function(req,res){
  console.log(req.body);
  
    var c_order=req.body.c_order;
    var date=req.body.date;
    var cost=req.body.cost;
    var proposal=req.body.proposal;
    var status=req.body.status;
    var cust_id=req.body.cust_id;
  
     var sql=`insert into clead(c_order,date,cost,proposal,status,cust_id) values('${c_order}','${date}','${cost}','${proposal}','${status}','${cust_id}')`;
      connection.query(sql, function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:error
          });
          console.log(error);
        }else{
            res.json({
  
              status:true,
              data:results,
              message:'Lead generated '
          })
        }
      });
});

//get all details
router.get('/getclead', function(req,res){
  connection.query('select * from clead',(error,rows,fields)=>{
    if (!error)
      res.send(rows);
      else
      console.log(error);
  });
});

//get details of lead by joining two tables customers and clead
router.get('/getcleaddetails', function(req,res){
  connection.query('select cname,organization,email,contactno,address,details,status,cost,proposal from clead cl,customers c where cl.cust_id=c.cid',(error,rows,fields)=>{
    if (!error)
      res.send(rows);
      else
      console.log(error);
  });
});

// get specific clead detail
router.get('/getclead/:lid', (req,res)=>{
  connection.query('select * from clead where lid= ?',[req.params.lid],(error,rows,fields)=>{
    if (!error)
      res.send(rows);
      else
      console.log(error);
  });
});

router.put('/updateclead/:lid', (req,res)=>{
  
  let sql=`update clead set c_order= '${req.body.c_order}',cost='${req.body.cost}',proposal='${req.body.proposal}',status='${req.body.status}' where lid= '${req.params.lid}'`;
   connection.query(sql,(error,rows,fields)=>{
     if (!error)
       res.send('Updated lead successfully');
       else
       console.log(error);
   });
 });

module.exports = router;