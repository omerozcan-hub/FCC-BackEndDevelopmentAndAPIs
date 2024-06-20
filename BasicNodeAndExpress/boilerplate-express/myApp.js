const bodyParser = require('body-parser');
let express = require('express');
let app = express();

require('dotenv').config();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(function middleware(req, res, next){
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

/*
console.log("hello world");



app.use('/public', express.static(__dirname + '/public'))

app.get('/json',(req, res) =>{
    res.json({
    "message": "Hello json"})
});

app.get('/name',(req, res)=>{
    const {first, last} = req.query;
    const fullName = `${first} ${last}`;
    res.send({name: fullName});
})

*/

app.get('/',(req, res) =>{
    res.sendFile(__dirname+'/views/index.html')
});

app.get('/json',(req, res) =>{
    const dude = process.env.MESSAGE_STYLE
    if(dude == 'uppercase'){
        res.json({"message": "HELLO JSON"})
    }else{
        res.json({"message":"Hello json"})
    }
});

app.get('/now',
function middleware(req, res, next){
    req.time = new Date().toString();
    next();
},
(req, res)=>{
    res.send({time: req.time});
})

app.get('/:word/echo', (req, res)=>{
    res.send({echo: req.params.word})
})

app.post('/name',(req, res)=>{
    const first = req.body.first;
    const last= req.body.last;
    var fullname = first+" "+last;
    res.send({name: fullname});
})




























 module.exports = app;
