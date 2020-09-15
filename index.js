const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const express = require('express');
const Greet = require('./greetings');
const greet = Greet();
let app = express();



app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/greeted", function (req, res) {
  res.render("greeted", {
    namesStored: greet.greeted()


  })
});

app.get("/counter/:name", function (req,res){
  let namesGreeted  = req.params.name
  res.render("count", {message: greet.countTimes(namesGreeted)})

  
})

app.get("/", function(req, res){
  res.render("index");
});

app.post('/', function(req, res) {
let firstName = req.body.greeting
let languages = req.body.language
greet.namesStored(firstName);
console.log(greet.greetLang(firstName,languages))
res.render("index", {  msg : greet.greetLang(firstName,languages)});
});



let PORT = process.env.PORT || 3011;

app.listen(PORT, function(){

  console.log('App starting on port', PORT);
});



