

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/nsti").then(()=>
{
    console.log("connected successfulllll");

}).catch((error)=>{console.log(error)})

Schema = mongoose.Schema({
    uname: String,
    pass: String
})

StudentModel = mongoose.model('Student', Schema);
module.exports =StudentModel