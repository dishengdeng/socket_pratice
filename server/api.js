var fs = require('fs');
const fileUpload = require('express-fileupload');
//var multer  = require('multer');
var bodyParser = require('body-parser');
//var upload = multer({ dest: 'uploads/' });
const ImageUrl="./client/userImages/";
const host="http://172.18.88.204/";

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

var getUserImage = function(app)
{
	app.get('/image/:name/:fileName', function(req, res)
	{
			//fs.readFile(ImageUrl+decodeURI(req.params.name)+"/"+decodeURI(req.params.fileName),'utf8',(err,result)=>{
					//if (err)
					//{
						//console.log(err);
						//return res.status(500).send(err);
					//}
					//res.send("ok");
					//console.log(result);
			//} );
		 var readStream = fs.createReadStream(ImageUrl+decodeURI(req.params.name)+"/"+decodeURI(req.params.fileName));
		readStream.pipe(res);

	});
}

var uploadProfileImage = function(app,io)
{
	app.use(fileUpload({

		limits: { fileSize: 50 * 1024 * 1024 }
	}));
		// parse application/x-www-form-urlencoded

	app.use(bodyParser.urlencoded({ extended: false,limit: '50mb',parameterLimit: 1000000 }));

	// parse application/json
	app.use(bodyParser.json());


	app.post('/uploadImage', function(req, res) {

			console.log(req.files);
			console.log(req.body);
			console.log(userData);


			  if (!req.files)
				return res.status(400).send('No files were uploaded.');
			if(!fs.existsSync(ImageUrl+req.body.name))
			{
				fs.mkdirSync(ImageUrl+req.body.name);
			}
			let img = req.files.image;

			img.mv(ImageUrl+req.body.name+"/"+img.name,function(err)
			{
				    if (err)
					{
						console.log(err);
						return res.status(500).send(err);
					}

			 		res.statusCode=200;
					res.setHeader('Content-Type','application/json');
					res.send({"message":"ok"});


					//var tempUserData=userData;
					//tempUserData.name=req.body.name;
					//tempUserData.["imageUrl"]=host+"image/"+req.body.name+"/"+img.name;
					for(var index in userData.data)
					{
						console.log("updating images---");
							if(userData.data[index].userName===req.body.name)
							{
								userData.data[index]["imageUrl"]=host+"image/"+req.body.name+"/"+img.name;
							}

					}
					io.sockets.emit('send:message',userData.data);
					io.sockets.emit('send:userImageUrl',{"name":req.body.name,"imageUrl":host+"image/"+req.body.name+"/"+img.name});

			}
			);

	});
}

module.exports = function(app,io)
{
	getUsers(app);
	getData(app);
	writeData(app,io);
	uploadProfileImage(app,io);
	getUserImage(app);
}
