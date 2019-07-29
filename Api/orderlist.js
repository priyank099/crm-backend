var connection = require('../config');
const express = require('express');
const router = express.Router();

//get details of all the customers whose status is done
router.get('/getorders', function(req,res){
    connection.query('select cname,organization,email,contactno,address,details from clead ,customers where status="done"',(error,rows,fields)=>{
      if (!error)
        res.send(rows);
        else
        console.log(error);
    });
  });

//get detail of specific customer whose status is done
  router.get('/getorderdetail/:lid', function(req,res){
    connection.query('select clead.c_order, customers.cname from clead join customers on clead.cust_id=customers.cid where clead.status="done" and clead.lid=?',[req.params.lid],(error,rows,fields)=>{
      if (!error){
        res.send(rows);
      }
        else{
        console.log(error);
        }
    });
  });

module.exports=router;