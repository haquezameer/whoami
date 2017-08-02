var express = require('express');
var app = express();



app.set('trust proxy',true);


app.use(express.static('public'));

app.get("/", function (req, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami",(req,res) => {
  let ip = req.ip;
  let lan = req.header('accept-language');
  lan = lan.split(',')[0];
  let sw = req.header('User-Agent');
  let start = sw.indexOf('(') + 1;
  let end = sw.indexOf(')');
  sw = sw.slice(start,end);
  res.send({
    ipaddress: ip,
    language: lan,
    software : sw
  });
});

let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
