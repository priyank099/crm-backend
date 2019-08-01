var connection = require('../config');
const express = require('express');
const router = express.Router();

//customer makes visit request
router.post('/addvisit', function(req,res){
var cus_vid=req.body.cus_vid;
var visit_days=req.body.visit_days;

var sql=`insert into visit(cus_vid,visit_days) values('${cus_vid}','${visit_days}')`;
connection.query(sql,function(error,results,fields){
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
            message:'Your visit has been requested '
        })
      }
});
});

//details of customer who requested for visit
router.get('/getvisit',function(req,res){
    connection.query('select cname,visit_days from customers c,visit v where v.cus_vid=c.cid',(error,rows,fields)=>{
        if (!error)
          res.send(rows);
          else
          console.log(error);
      });
    });

module.exports=router;