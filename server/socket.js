userData={
  "name":"",
  "data":[]
};
names = [];
userHeader={};

var userNames = (function () {
  

  var claim = function (name) {
    var result=true;
    if(!name)
    {
      result=false;
    }
    else {
      for(var user in names)
      {

        if(names[user].name==name)
        {

          result=false;
        }

      }
    }

    return result;

  };

  // find the lowest unused "guest" name and claim it
  var getGuestName = function (socket) {

    var name,nextUserId=1;



    if(names.length==0)
    {
      name = 'Guest ' + nextUserId;
      names.push({"name":name,"socketID":socket.id});
    }
    else {
      var check=true;

      while(check)
    {

        name = 'Guest ' + nextUserId;
        if(claim(name))
        {
          names.push({"name":name,"socketID":socket.id});

          check=false;
        }
        nextUserId += 1;


      }




    }





    return name;
  };

  var changeName=function(data)
  {
      for(var user in names)
      {
          if(names[user].socketID==data.socketID)
          {
              names[user].name=data.name;
			  names["imageUrl"]=data.imageUrl
          }
      }
  }
  // serialize claimed names as an array
  var get = function () {
    return names;

  };

  var free = function (name) {

    names.splice(name,1);
  };

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName,
    changeName:changeName
  };
}());

module.exports = function (client,io) {

	var guestName = userNames.getGuestName(client);
userData.name=guestName;

	 userHeader={
		 "name":guestName,
		 "imageUrl":""
	 };

	console.log("userlist: " +JSON.stringify(userNames.get()));


   client.on('send:message',(data)=>{
	  console.log("user send message: "+JSON.stringify(data));
    //userData.name=data.name;
    userData.data.push(data);

		  io.sockets.emit('send:message',userData.data);


  });

  client.on('send:changeName',(data)=>{
   var result=false;
   console.log("changing user: " + JSON.stringify(data));
   if (userNames.claim(data.name)) {


     userData.name=data.name;
     userNames.changeName(data);
     client.emit('send:init',userData);
	 //io.socket.emit('send:userImageUrl',{"name":data.name,"imageUrl":data.imageUrl});

	userHeader.name=data.name;
	userHeader.imageUrl=data.imageUrl;
	 //client.emit('send:userHeader',userHeader);
     io.sockets.emit('send:userlist',userNames.get());

     result=true;
   } else {
     result=false;
   }
  client.emit('send:changeName',result);

 });

  client.emit('send:init',userData);

  client.on('disconnect',function(){
    var sockets=userNames.get();
    for(var user in sockets)
    {
      if(sockets[user].socketID==client.id)
      {
        console.log("userleft: "+sockets[user].name);

        userNames.free(user);
      }
    }
    io.sockets.emit('send:userlist',userNames.get());
  });
  //whole list of users
  console.log(userHeader);
	client.emit('send:userHeader',userHeader);
  io.sockets.emit('send:userlist',userNames.get());
}
