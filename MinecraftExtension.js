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
		});
		/*$.get("http://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return 1;
			}else{
				return 0;
			}
		});*/
	};
	
	ext.getMotd = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");}
			
			if(status.online === true){
				callback(status.motd);
				return status.motd;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getOnlinePlayers = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");}
			
			if(status.online === true){
				callback(status.players.now);
				return status.players.now;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getMaxPlayers = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");}
			
			if(status.online === true){
				callback(status.players.max);
				return status.players.max;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getServerSoftware = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");}
			
			if(status.online === true){
				callback(status.server.name);
				return status.server.name;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			['R', 'Motd of %s %n', 'getMotd', '', 25565],
			['R', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			['R', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			['R', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
		]
	};
	
	ScratchExtensions.register('Minecraft Extension', descriptor, ext);
})({});
