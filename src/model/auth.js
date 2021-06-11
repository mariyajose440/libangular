const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
mongoose.connect('mongodb+srv://userone:userone@fsddatabase.ttpro.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });
const Schema=mongoose.Schema;
const auth=new Schema({
    title:String,
    gen:String,
    dis:String,
    img:String
});
var authdata=mongoose.model('auth',auth);
module.exports =authdata;
