var messages=[];

var userNames = (function () {
  var names = {};

  var claim = function (name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function () {
    var name,
      nextUserId = 1;

    do {
      name = 'Guest ' + nextUserId;
      nextUserId += 1;
    } while (!claim(name));

    return name;
  };

  // serialize claimed names as an array
  var get = function () {
    var res = [];
    for (user in names) {
      res.push(user);
    }

    return res;
  };

  var free = function (name) {
    if (names[name]) {
      delete names[name];
    }
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
}());

module.exports = function (client) {
	var guestName = userNames.getGuestName();

	console.log(userNames.get());
   client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
	    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
  
   client.on('send:message',(message)=>{
	  console.log(message);
	  
	  messages.push(message);
	  //client.emit('send:message',message);
	
	  client.broadcast.emit('send:message',message);
	  	  client.emit('send:message',message);
	  //client.emit('send:message',message+count);
	  
  });
  
  client.emit('send:init',messages);
  
}

