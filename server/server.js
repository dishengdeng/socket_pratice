const io = require('socket.io')();
var client = require('./socket.js');
io.on('connection', client);




const port = 8000;
io.listen(port);
console.log('listening on port ', port);