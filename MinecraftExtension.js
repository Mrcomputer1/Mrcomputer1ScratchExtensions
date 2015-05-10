(function(ext) {
	
	$.ajax({

        async:false,

        type:'GET',

        url:'https://mcapi.us/scripts/minecraft.js',

        data:null,
        
        success: function(){},

        dataType:'script'

    });
	
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		return {status:2, msg: 'Ready'};
	};
	
	ext.isOnline = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status) {
			if(err) {alert("Something went wrong!");}
			
			if(status.online === true){
				callback(1);
				return 1;
			}else{
				callback(0);
				return 0;
			}
		})
		/*$.get("http://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return 1;
			}else{
				return 0;
			}
		});*/
	};
	
	/*ext.getMotd = function(serverIP, serverPORT) {
		$.get("https://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return obj.motd;
			}else{
				return "Server not online!";
			}
		});
	};
	
	ext.getOnlinePlayers = function(serverIP, serverPORT) {
		$.get("https://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return obj.players.now;
			}else{
				return 0;
			}
		});
	};
	
	ext.getMaxPlayers = function(serverIP, serverPORT) {
		$.get("https://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online == true){
				return obj.players.max;
			}else{
				return 0;
			}
		});
	};
	
	ext.getServerSoftware = function(serverIP, serverPORT) {
		$.get("https://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return obj.server.name;
			}else{
				return 0;
			}
		});
	};*/
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			//['r', 'Motd of %s %n', 'getMotd', '', 25565],
			//['r', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			//['r', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			//['r', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
		]
	};
	
	ScratchExtensions.register('Minecraft Extension', descriptor, ext);
})({});
