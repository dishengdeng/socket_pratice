var getUsers = function(app)
{
	app.get('/users', function(req, res){
  res.send({"data":"hello"});
});


}

module.exports = function(app)
{
	getUsers(app);
}
