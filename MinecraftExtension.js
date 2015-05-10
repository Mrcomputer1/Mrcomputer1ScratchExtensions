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
			if(err) {alert("Something went wrong!");callback(0)}
			
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
			if(err) {alert("Something went wrong!");callback(0)}
			
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
			if(err) {alert("Something went wrong!");callback(0)}
			
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
			if(err) {alert("Something went wrong!");callback(0)}
			
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
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(status.server.name);
				return status.server.name;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.isVersion = function(serverIP, serverPORT, version, callback){
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			var p = 0;
			if(version === "1.8.3-1.8"){
				p = 47;
			}else if(version === "1.8-pre3"){
				p = 46;
			}else if(version === "1.8-pre2"){
				p = 45;
			}else if(version === "1.8-pre1"){
				p = 44;
			}else if(version === "1.7.10-1.7.6"){
				p = 5;
			}else if(version === "1.7.5-1.7.1pre"){
				p = 4;
			}
			
			
			
			if(status.online === true){
				if(p === status.server.protocol){
					callback(1);
					return 1;
				}else{
					callback(0);
					return 0;
				}
			}else{
				callback(-1);
				return -1;
			}
		});
	};
	
	ext.removeColorCodes = function(message, callback){
		message = message.replace("§4", "");
		message = message.replace("§1", "");
		message = message.replace("§c", "");
		message = message.replace("§9", "");
		message = message.replace("§6", "");
		message = message.replace("§d", "");
		message = message.replace("§e", "");
		message = message.replace("§5", "");
		message = message.replace("§2", "");
		message = message.replace("§f", "");
		message = message.replace("§a", "");
		message = message.replace("§7", "");
		message = message.replace("§b", "");
		message = message.replace("§8", "");
		message = message.replace("§3", "");
		message = message.replace("§0", "");
		message = message.replace("§l", "");
		message = message.replace("§k", "");
		message = message.replace("§n", "");
		message = message.replace("§m", "");
		message = message.replace("§o", "");
		message = message.replace("§r", "");
		callback(message);
		return message;
	};
	
	ext.spiltLines(message, line, callback){
		messagesplit = message.split("\n");
		if(line === "Line 1"){
			callback(messagesplit[0]);
			return messagesplit[0];
		}else{
			callback(messagesplit[1]);
			return messagesplit[1];
		}
	};
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			['R', 'Motd of %s %n', 'getMotd', '', 25565],
			['R', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			['R', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			['R', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
			['R', 'Is %s %n %m.mcVersion', 'isVersion', '', 25565, '1.8.3-1.8'],
			['r', 'Remove Motd Color Codes %s', 'removeColorCodes', ''],
			['r', 'Get %m.line of %s', 'splitLines', 'Line 1', ''],
		],
		menus: {
			mcVersion: ["1.8.3-1.8", "1.8-pre3", "1.8-pre2", "1.8-pre1", "1.7.10-1.7.6", "1.7.5-1.7.1"],
			line: ["Line 1", "Line 2"]
		}
	};
	
	ScratchExtensions.register('Minecraft Extension', descriptor, ext);
})({});
