var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('build'));

io.on("connection", function(socket) {
	
	console.log("user connected");
	socket.emit("init", {asdf:"asdf"});
	
	socket.on("save-zones", function(data) {
		setTimeout(function() {
			io.emit("new-zones", {body: "new zones"});
		}, 1000);
	});

	socket.on("disconnect", function(data) {
		console.log("user disconnect");
	})

});

var server = http.listen(2998, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});