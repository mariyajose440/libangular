const mongoose=require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://userone:userone@fsddatabase.ttpro.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });    
const Schema=mongoose.Schema;
    const bookschema= new Schema(
    {
        title:String,
        author:String,
        gen:String,
        dis:String,
        img:String
    });
    var bookdata=mongoose.model('bdatas',bookschema);
    module.exports=bookdata;