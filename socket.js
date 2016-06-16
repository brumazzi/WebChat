var socket = null;
var el = function(id){return document.getElementById(id);};
var msgc = null;
var user = null;

function open(){
	msgc = el('msgc');
	user = el('user').value;
	socket = new WebSocket("ws://localhost:8080");
	socket.onopen = function(event){
		if(user == ""){
			close();
			alert('Enter the Username');
		}
		socket.send('@+'+user);
		el('msg').disabled = false;
		el('connected').style.background = "green";
	};
	socket.onclose = function(){
		el('msg').disabled = true;
		el('connected').style.background = "red";
	};
	socket.onerror = function(error){
		alert(error);
	}
	socket.onmessage = function(msg){
		msgc.innerHTML += msg.data;
	}

}

function close(){
	if(socket){
		var obj = {
			to: el('to_send').value,
			from: user,
			msg: user+" logout!"
		};
		socket.send("!"+JSON.stringify(obj));

		socket.send("@-"+user);
		socket.close();
		socket = null;
		user = null;
	}
}

function send(){
	var msg = el('msg').value;
	var to = el('to_send').value;
	var from = user;

	var obj = {
		to: to,
		from: from,
		msg: msg
	};

	if(socket && to != "" && msg != ""){
		socket.send("!"+JSON.stringify(obj));
		msgc.innerHTML += "<span class='send'>"+user+": <span class='msg'>"+msg+"</span></span>";
		el('msg').value = "";
	}
}
