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
			if(version === "1.8.3/1.8.2/1.8.1/1.8"){
				p = 47;
			}else if(version === "1.8-pre3"){
				p = 46;
			}else if(version === "1.8-pre2"){
				p = 45;
			}else if(version === "1.8-pre1"){
				p = 44;
			}else if(version === "14w34d"){
				p = 43;
			}else if(version === "14w34c"){
				p = 42;
			}else if(version === "14w34b"){
				p = 41;
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
	}
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			['R', 'Motd of %s %n', 'getMotd', '', 25565],
			['R', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			['R', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			['R', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
			['R', 'Is %s %n %m.mcVersion', 'isVersion', '', 25565, '1.8.3/1.8.2/1.8.1/1.8'],
		],
		menus: {
			mcVersion: ["1.8.3/1.8.2/1.8.1/1.8", "1.8-pre3", "1.8-pre2", "1.8-pre1", "14w34d", "14w34c", "14w34b"]
		}
	};
	
	ScratchExtensions.register('Minecraft Extension', descriptor, ext);
})({});
