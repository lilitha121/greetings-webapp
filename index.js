const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const Greet = require('./greetings');
const Separate = require('./separateRoutes');
const pg = require("pg");
let app = express();

const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greet_db';


const pool = new Pool({
  connectionString
});

const greet = Greet(pool);
const separate = Separate(greet);

app.engine('handlebars', exphbs({
  layoutsDir: 'views/layouts/'
}));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(flash());

app.use(session({
  secret: "please enter your name",
  resave: false,
  saveUninitialized: true
}));

app.get('/', separate.home);

app.post('/greetings', separate.greetings);

app.get("/greeted", separate.greetedNames);

app.get("/counter/:name", separate.counterNames);

app.get('/addFlash', separate.flash)

app.get("/resetData", separate.reset);


let PORT = process.env.PORT || 3011;

app.listen(PORT, function () {

  console.log('App starting on port', PORT);
});