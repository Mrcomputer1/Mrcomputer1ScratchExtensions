(function(ext) {
	
	var save = "";
	
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		return {status:2,msg:"Ready"};
	};
	
	ext.cmd_print = function() {
		save = save + "/n/n/n";
	};
	
	ext.build = function() {
		var gui = window.open("", "Code", "location=no,menubar=no,resizable=no,status=no,toolbar=no");
		save = save.replace("/n/n/n", "\n");
		gui.document.write("<textarea>"+save+"</textarea>");
		save = "";
	};
	
	var blocks{
		blocks: [
			[' ', 'BUILD', 'build'],
			[' ', 'print %s', 'cmd_print', 'Hello!'],
		]
	};
	
	ScratchExtensions.register("Python Maker", blocks, ext);
})({});
