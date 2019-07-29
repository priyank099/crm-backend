const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require("../config");
const crypto = require("crypto");

//login route
router.post('/auth', function(req, res, next) {
  let { emp_email, emp_pass } = req.body;
  let key= crypto.pbkdf2Sync(emp_pass,'salt',100,10,'sha512');
    emp_pass= key.toString('hex');

    let sql =`select emp_id from employees where emp_email='${emp_email}' and emp_pass='${emp_pass}'`;
    connection.query(sql, function(error, result, fields) {
    if (error) {
      return res.json({
        status: false,
        message: error
      });
    }
    console.log(result[0].emp_id);
       if (result[0].emp_id > 0) {
       const token = jwt.sign({emp_id:result[0].emp_id}, process.env.TOKEN_SECRET);
         res.header("auth-token", token).json({msg:'Ok',tokenkey:token});
       }

  });
});

module.exports=router;