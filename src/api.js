import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

function subscribeToTimer(cb) {
	console.log(cb);
	  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
} 


function receviceMassge(fn)
{
	console.log(' client recevie');
	socket.on('send:message', message => fn(null, message));
}

function sendMassge(message)
{
	socket.emit('send:message', message);
}

export { subscribeToTimer, receviceMassge, sendMassge}