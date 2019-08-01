const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const dotenv = require("dotenv");
const connection = require("../config");

dotenv.config();

const router = express.Router();

router.put("/resetpass", (req, res) => {
  let { emp_email,emp_pass } = req.body;
  let key = crypto.pbkdf2Sync(emp_pass, "salt", 100, 10, "sha512");
  emp_pass = key.toString("hex");
  let sql = `Update employees SET emp_pass='${emp_pass}' WHERE emp_email='${emp_email}'`;
  let query = connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.send("Password Updated");
  });
});

module.exports = router;
