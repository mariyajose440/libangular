const express=require("express");
const authRouter =express.Router();
var bodyParser = require('body-parser');
authRouter.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const authdata=require("../model/auth");
var cors = require('cors');
authRouter.use(cors());
function add()
{
    function verifyToken(req,res,next)
    { 
        const jwt=require('jsonwebtoken');
        if(! req.headers.authorization)
        {
            console.log("error 1");
            return res.status(401).send('unauthorized req');
        }
        let token=req.headers.authorization.split(' ')[1];
        if(token=='null')
        {
            console.log("error 2");
            return res.status(401).send('unauthorized req 2');
        }
        let payload=jwt.verify(token,'secretkey');
        console.log(payload);
        if(!payload)
        {
            console.log("error 3");
            return res.status(401).send('unauthorized req 3');
        }
        req.userId=payload.subject;
        next()
    }   
    authRouter.get('/auth',function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
        authdata.find()
        .then(function(auth){
        res.send(auth);
        }) 
    });

    authRouter.post('/addauthdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        console.log("auth");
        var auth={
            title:req.body.data.title,
            gen:req.body.data.gen,
            dis:req.body.data.dis,
            img:req.body.data.img
        }
        var data=new authdata(auth);
        data.save();
    });

    authRouter.post('/updateauthdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        console.log("update");
        var id=req.body.data._id;
        var auth={
            title:req.body.data.title,
            author:req.body.data.author,
            gen:req.body.data.gen,
            dis:req.body.data.dis,
            img:req.body.data.img
        }
        authdata.findOneAndUpdate({_id:id},auth)
        .then(()=>console.log("update auth"));
    });

    authRouter.post('/deleteauthdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        var id=req.body.data;
        authdata.findOneAndDelete({_id:id})
        .then(()=>{console.log("delete auth")});
    });
return authRouter;
}
module.exports=add;