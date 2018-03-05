const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const lestinPort =3200;
var app = express();

hbs.registerPartials(__dirname + '/views/Partials');
app.set('view engine' , 'hbs');

app.use((req , res , next)=>{
    var now = new Date().toString();
    var log = `${now} ; ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log +'\n', (err)=>{
        if(err){
                console.log('Unable to append to server,log');
               }

    });
    next();
});

// app.use((req , res) => res.render('maintance.hbs'));

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>new Date().getFullYear());

hbs.registerHelper('screamIt' , (text)=> text.toUpperCase())
// app.get('/', (req , res) => res.send('<h1>Hello Express !</h1>'));
app.get('/', (req , res) => res.render('home.hbs',
    {
        pageTitle :'Home Page',
        welcomeMessage : 'Welcome to my first node application home page'
    }));



app.get('/about', (req , res) => res.render('about.hbs',
    {
        pageTitle :'About Page'
    }));

app.get('/bad', (req , res) => res.send({errorMessage :'Error handeling Request'}));

app.listen(lestinPort, () => console.log(`Example app listening on port ${lestinPort}!`));


// const express = require('express');
// var app = express();
//
// app.get('/', (req, res) => res.send('Hello World .....!'));
//
// app.listen(3200, () => console.log('Example app listening on port 3200!'));