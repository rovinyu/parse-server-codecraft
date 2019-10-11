Parse.Cloud.define("beatHeartCheck", function(request, response) {
	
	var timeInterval = 1000*5; //5s
	setInterval(function() {
	
		// Set up to modify user data
		Parse.Cloud.useMasterKey();
		var q = new Parse.Query("X86_64");
		query.greatThan("timeout", 0);
		query.count().then(function(count) {
			if(count > 0) {
				query.each(function (device) {
				// Update to plan value passed in
				var newValue = device.get("timeout") - timeInterval;
				if (newValue <= 0) {
					device.set("timeout",0);
					device.set("status", "offline");
					console.log("Set status as：offline");
					device.save();
				} else {
					device.set("timeout", newValue);
					console.log("Set new timeout value:", newValue);
				}
				
				});
			}
		})
		.catch(function(error){
			 throw "Error " + error.code + " : " + error.message;
		});
	}, timeInterval);
	
	response.success('start beatheart check');
});