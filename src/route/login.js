const express=require("express");
const loginRouter =express.Router();
var bodyParser = require('body-parser');
loginRouter.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cors = require('cors');
var ups=require("../model/login");
loginRouter.use(cors());

function add()
{
    loginRouter.post('/login',function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        var login={
            name:req.body.data.name,
            email:req.body.data.email,
            phn:req.body.data.phn,
            password:req.body.data.password
        };
        var data=new ups(login);
        data.save();
    });   
    loginRouter.post('/check',function(req,res){
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        const jwt=require('jsonwebtoken');
        var use=req.body.data;
        ups.findOne({email:use.username})
        .then(function(up){
            if(up.password !==use.userpassword)
                res.status(200).send("invalid password");
            else
            {
                var upname=up.name;
                let payload={subject:up.email+up.password};
                let token=jwt.sign(payload,'secretkey');
                res.status(200).send({token});
            }
        })
    })
    return loginRouter;
    
    
}
module.exports=add;