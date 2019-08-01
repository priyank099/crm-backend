var express=require("express");
var bodyParser=require('body-parser');
var app = express();

var Customer=require('./Api/customer');
var Lead=require('./Api/lead');
var Orderlist=require('./Api/orderlist');
var Employees=require('./Api/employees');
var Auth=require('./Api/auth');
var Forget=require('./Api/forget');
var ResetFromEmail=require('./Api/reset');
var Resetviaemail=require('./Api/resetpasswordviaemail');
var Visit=require('./Api/visit');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api',Customer);
app.use('/api',Lead);
app.use('/api',Orderlist);
app.use('/api',Employees);
app.use('/api',Auth);
app.use('/api',Forget);
app.use('/api',ResetFromEmail);
app.use('/api',Resetviaemail);
app.use('/api',Visit)

app.listen(5000);