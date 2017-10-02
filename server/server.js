const port = 8000;

//start node server
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const api = require('./api.js')(app);


//start web socket
var client = require('./socket.js');
io.on('connection', client);

var server = http.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  //console.log("Example app listening at http://%s:%s", host, port);

})

//io.listen(port);
console.log('listening on port ', port);