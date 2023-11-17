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
  if (process.env.MESSAGE_STYLE == "uppercase"){
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
})


































module.exports = app;
