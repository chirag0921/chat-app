var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
	res.sendFile(__dirname+'/index.html');
  });
  
 io.on('connection',function(socket){
	console.log('a user connected'); 
	
	socket.on('join',function(nickname){
		socket.nickname = nickname;
		socket.broadcast.emit('notice',nickname+' has join the chat.');
		console.log(nickname + ' has join the chat.');
		//users.push({'nickname':nickname,'socket':userSocket});
	});
	
	socket.on('disconnect',function(){
		console.log('user disconnectd');
	});

	socket.on('chat message',function(msg){
		console.log('message:'+msg);
		//io.emit('chat message',msg);
		socket.broadcast.emit('chat message', msg);
	});

	socket.on('is typing', function (data) {
	    socket.broadcast.emit('typing', { nickname: data.nickname });
	});
 });

http.listen(3000, function(){
  console.log('listening on *:3000');
});