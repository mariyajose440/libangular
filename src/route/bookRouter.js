const express=require("express");
const bookRouter =express.Router();
var bodyParser = require('body-parser');
bookRouter.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const bookdata=require("../model/book");
var cors = require('cors');
bookRouter.use(cors());


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
    bookRouter.get('/book',function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
        bookdata.find()
        .then(function(book){
        res.send(book);
        })  
    }); 
    bookRouter.post('/addbookdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        console.log("book");
        var book={
            title:req.body.data.title,
            author:req.body.data.author,
            gen:req.body.data.gen,
            dis:req.body.data.dis,
            img:req.body.data.img
        }
        var data=new bookdata(book);
        data.save();
    });
    bookRouter.post('/updatebookdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        console.log("update");
        var id=req.body.data._id;
        var book={
            title:req.body.data.title,
            author:req.body.data.author,
            gen:req.body.data.gen,
            dis:req.body.data.dis,
            img:req.body.data.img
        }
        bookdata.findOneAndUpdate({_id:id},book)
        .then(()=>console.log("update book"));
    });
    bookRouter.post('/deletebookdata',verifyToken,function(req,res)
    {
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
        var id=req.body.data;
        bookdata.findOneAndDelete({_id:id})
        .then(()=>{console.log("delete book")});
    });
    return bookRouter;
    
    
}
module.exports=add;