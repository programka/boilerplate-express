let bodyParser = require('body-parser');

let express = require('express');
let app = express();
console.log("Hello World");

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get('/', (_, res) => {
  absolutePath = __dirname + "/views/index.html"
  res.sendFile(absolutePath);
  // res.send('Hello Express');
})

app.use("/public", express.static(__dirname + "/public"));

app.get('/json', (_, res) => {
  if (process.env.MESSAGE_STYLE == "uppercase") {
    res.json({ "message": "HELLO JSON" });
  } else {
    res.json({ "message": "Hello json" });
  }
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({ time: req.time });
});

app.get('/:word/echo', function(req, res, next) {
  word = req.params.word;
  next();
}, function(req, res) {
  res.send({ echo: word });
});

app.get('/name', function(req, res, next) {
  firstname = req.query.first;
  lastname = req.query.last;
  next();
}, function(req, res) {
  res.send({ name: firstname + ' ' + lastname });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/name', function(req, res, next) {
  firstname = req.body.first;
  lastname = req.body.last;
  next();
}, function(req, res) {
  res.send({ name: firstname + ' ' + lastname });
});






























module.exports = app;
