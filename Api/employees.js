var connection = require('../config');
const express = require('express');
const router = express.Router();
const crypto= require('crypto');

//add new employee
router.post('/registeremp',function(req,res){
  var employee={
    "emp_name":req.body.emp_name,
    "emp_address":req.body.emp_address,
    "emp_email":req.body.emp_email,
    "emp_pass":req.body.emp_pass
    }
    
    var emp= employee;
    const key= crypto.pbkdf2Sync(emp.emp_pass,'salt',100,10,'sha512');
    emp.emp_pass= key.toString('hex');
      
    connection.query(`select count(emp_email) as count from employees where emp_email='${req.body.emp_email}'`,function (error,results){
      if(error){
        console.log(error);
      }
      console.log(results);
      if(results[0].count > 0){
        res.status(400).json('Employee already exists');
      }else{
    connection.query('insert into employees set ?',emp,function (error, results, fields) {
        if (error) {
          res.json({
              status:false,
              message:'there are some error with query'
          })
        }else{
            res.json({
  
              status:true,
              data:results,
              message:'Employee added sucessfully'
          })
        }
      });
    }
    });
});


module.exports=router;
