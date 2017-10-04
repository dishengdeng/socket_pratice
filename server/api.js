var fs = require('fs');

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

module.exports = function(app)
{
	getUsers(app);
	getData(app);
}
