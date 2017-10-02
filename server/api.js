var getUsers = function(app)
{
	app.get('/users', function(req, res){
  res.send('<h1>Hello world</h1>');
});


}

module.exports = function(app)
{
	getUsers(app);
}
