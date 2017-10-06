import openSocket from 'socket.io-client';

const socket = openSocket('http://172.18.88.47:8000');

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

function receviceInitMassge(fn)
{
	
	socket.on('send:init', messages => fn(null, messages));
}


function sendMassge(message)
{
	socket.emit('send:message', message);
}

function receviceUserData(fn)
{
	console.log(' client recevie');
	socket.on('update:userData', data=> fn(null, JSON.parse(data)));
}


function receviceUserList(fn)
{
	
	socket.on('send:userlist', data=> fn(null, data));
}

export { subscribeToTimer, receviceMassge, sendMassge, receviceUserData, receviceInitMassge, receviceUserList}