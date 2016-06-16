var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8080}),
    users = new Object();

wss.on('connection', (ws) => {
	ws.on('message', (msg) => {
		if(msg.charAt(0) == '@'){
			msg = msg.slice(1);
			if(msg.charAt(0) == '-'){
				msg = msg.slice(1);
				delete users[msg];
			}else if(msg.charAt(0) == '+'){
				msg = msg.slice(1);
				users[msg] = new Object({
					name: msg,
					conn: ws
				});
			}
		}else if(msg.charAt(0) == '!'){
			msg = msg.slice(1);
			var obj = JSON.parse(msg);
			var nlist = obj.to.split(" ");
			for(var x=0;x<nlist.length;x+=1)
				if(users[nlist[x]])
					users[nlist[x]].conn.send('<span class="receive">'+obj.from+': <span class="msg">'+obj.msg+'</span></span>');
		}
	});
	ws.on('close', () => {
		console.log('cliente closed!');
	});
	console.log('Connected');
});

console.log("Server as running in port 8080!");
