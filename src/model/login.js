const mongoose=require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://userone:userone@fsddatabase.ttpro.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });    
const Schema=mongoose.Schema;
    const loginschema= new Schema(
    {
        name:String,
        email:String,
        phn:String,
        password:String
    });
    var login=mongoose.model('ups',loginschema);
    module.exports=login;