var fs = require('fs');

var emitAll= function(io,data)
{
	//var clients=io.sockets.clients();
	//for ( i = 0; i < clients.length; i++ ) {
		console.log(data);
    io.sockets.emit('update:userData', data);
	//);
}

var getUsers = function(app)
{
	app.get('/users', function(req, res){
  res.send({"data":"hello"});
});


}

var getData = function(app)
{
	app.get('/data', function(req, res)
	{
		fs.readFile('./server/data.json',(err,result)=>
		{
				
				if(err)
				{
				res.statusCode=404;
				res.setHeader('Content-Type','application/json');
				res.send(err);

				}
				else {

					res.statusCode=200;
					res.setHeader('Content-Type','application/json');
					res.send(result);
				}


		});

	});


}

var writeData = function(app,io)
{
	app.get('/update/:name', function(req, res)
	{
			var fileName = './data.json';
			var file = require(fileName);

			file.name = req.params.name;

			fs.writeFile('./server/data.json', JSON.stringify(file), function (err) {
			  if (err) return console.log(err);
			  console.log(JSON.stringify(file));
			  console.log('writing to ' + fileName);
			res.statusCode=200;
			res.setHeader('Content-Type','application/json');
			res.send({"message":"ok"});
			  fs.readFile('./server/data.json','utf8',(err,result)=>{
			  emitAll(io,result);}
			  );
			});
			
			

	});


}

module.exports = function(app,io)
{
	getUsers(app);
	getData(app);
	writeData(app,io);
}
