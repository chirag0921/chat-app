//$(document).ready(function(){	
		var socket = io(),
			nickname,
			msgList = $('#messages');
			
		if('localstorage' in window & localstorage.getItem('nickname')){
			nickname = localstorage.getItem('nickname');
		} else {
			nickname = prompt('Enter your nickname');
			if('localstorage' in window){
				localstorage.setItem('nickname', nickname);
			}
		}
		
		socket.emit('join', nickname);
		$('form').submit(function(){
			socket.emit('chat message', {'nickname': nickname, "msg" :$('#m').val()});
			$('#m').val('');
			return false;
		});
		socket.on('chat message',function(msg){
			$('#messages').append($('<li>').text(msg.nickname + ': ' + msg.msg));
		});

//});