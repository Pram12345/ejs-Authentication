express = require('express');

path = require('path');
phash = require('bcrypt');
Student = require('./database');
app = express();
port = 3000;


app.set('view engine', 'ejs' )
app.use(express.static(path.join(__dirname,'../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res) =>
{
    res.render('login')
})


app.get('/register',(req,res) =>
{
    res.render('register')
})

app.get('/home', (req,res)=>{
    res.render('home')
})


app.post('/', async(req, res)=>{
    data = {
        uname : req.body.uname,
        pass: req.body.pass
    }
    
    const checkuser = await Student.findOne({uname:req.body.uname})
    if(checkuser){
        const checkpass = await phash.compare(data.pass, checkuser.pass);
        if(checkpass){res.redirect('/home')}
        else(res.send('incorrect password'))
    }
    else{res.send('username does not exist')}
})


app.post('/register', async(req,res)=>
{

   const {uname, pass}= req.body;
    existinguser = await Student.findOne({uname})
    if(existinguser){res.send('user alreay exists. please try another user name')}
    else{
        enpass = await phash.hash(pass, 11);
        newStudent = new Student({uname: uname, pass:enpass});
        console.log(uname, enpass)
        Studentsave = await newStudent.save();

        res.redirect('/register')
    }

})




// app.post('/register', async (req,res)=>
// {
  
    // const {uname, pass}= req.body;
    // existinguser = await Student.findOne({uname})
    // if(existinguser){res.send('user alreay exists. please try another user name')}
    // else{
    //     enpass = await bcrypt.hash(pass, 11);
    //     newStudent = new Student({uname, enpass});
    //     console.log(uname, enpass)
    //     Studentsave = await newStudent.save();
    //     res.redirect('/register')
    // }
    






    // const {uname, pass} = req.body; 
    // saltRounds = 10;
    // encpass = await phash.hash(pass, saltRounds);
    // console.log(encpass)
    // newStudent = new Student({uname, encpass});
    // Studentsave = await newStudent.save();
    // res.redirect('/register')



    // const {uname, pass}= req.body;
    // newStudent = new Student({uname, pass});
    // Studentsave = await newStudent.save();
    // res.redirect('/register')
// })



app.listen(port, () => {
    console.log(`server running on port ${port}`)
})










