const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const Greet = require('./greetings');
const pg = require("pg");
let app = express();

const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://lilithangele:pg123@localhost:5432/greet';

// ALTER USER lilithaNgele PASSWORD 'pg123';

// sudo -u postgres createdb greet;

const pool = new Pool({
  connectionString,
  ssl: useSSL
});
const greet = Greet(pool);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(express.static('public'));

app.use(flash());

app.use(session({
  secret: "please enter your name",
  resave: false,
  saveUninitialized: true
}));

app.get("/greeted", async function (req, res) {
  res.render("greeted", {
    namesStored: await greet.getAll()


  })
});

app.get("/counter/:name", async function (req, res) {
  let namesGreeted = req.params.name
  let personCounter = await greet.countTimes(namesGreeted)
  var message = "Hello, " + namesGreeted + " has been greeted " + personCounter + " times."

  res.render("count", {
    message
  })


});

app.get('/', function (req, res) {
  res.render('index', {

  })
});
app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.post('/greetings', async function (req, res) {
  let firstName = req.body.greeting
  let languages = req.body.language
  if (firstName === "") {
    req.flash('info', 'ERROR, Please enter your name');
  } else if (languages === undefined) {
    req.flash('info', 'ERROR, Please enter your language');
  } else {
    await greet.add(firstName);
    var counters = await greet.displayCounter(firstName)

  }
  console.log(counters)
  await greet.greetLang(firstName, languages)
  greet.getAll(firstName);
  res.render("index", {
    msg: await greet.greetLang(firstName, languages), counter: counters
  });

});

app.get("/resetData", async function (req, res) {
  await greet.deleteValues()
  res.redirect("/")

});


let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

  console.log('App starting on port', PORT);
});



