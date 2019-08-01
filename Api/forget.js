const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const connection = require("../config");

router.post("/forgotpass", (req, res) => {
  const { emp_email } = req.body;
  if (!emp_email) {
    res.json("email required");
  }
  let sql = 'SELECT emp_email FROM employees WHERE emp_email="' + emp_email + '"';
  let query = connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (!result[0]) {
      return res.status(400).json({ msg: "Email does not exist" });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 360000;
    let updateResetPassword = `UPDATE employees SET emp_resetpasstoken='${token}',emp_resetpassexpires='${expires}' WHERE emp_email='${emp_email}'`;

    let updatequery = connection.query(updateResetPassword, (err, result) => {
      if (err) {
        return console.log(err);
      }
      // console.log(result);
      res.send("Reset password link sent");
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "testingdev65@gmail.com",
        pass: "password@121"
      }
    });

    const mailOptions = {
      from: "email",
      to: emp_email,
      subject: "Link To Reset Password",
      // text: `You requested for reset password http://localhost:5000/api/reset/${token}`
      text: `You requested for reset password http://localhost:5000/api/resetpasswordviaemail/resetpass`
    };
    console.log("sending mail");

    transporter.sendMail(mailOptions, function(err, response) {
      if (err) {
        console.log("There was an error", err);
      } else {
        console.log("here is the response", response);
        res.status(200).json("recovery email sent");
      }
    });
  });
});

module.exports = router;
