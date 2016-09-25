({    
    getIntervalOptions : function(component){
        var startAt = component.get("v.startAt");
        var maxInterval = component.get("v.maxInterval");
        var intervalOptions = [];
        for(var i = 1; i <= (maxInterval - startAt); i++){
            intervalOptions.push(String(i));
        }  
        component.set("v.intervalOptions", intervalOptions);
    },
    
	toCronString : function(component) {
        var startAt = component.get("v.startAt");
        var interval = component.get("v.interval");
        component.set("v.cron", startAt + "/" + interval); 
	},
    
    parseCronString : function(component){
        
        var cron = component.get("v.cron");
        var cronArray = cron.split("/");
        if(cronArray.length == 2){
            component.set("v.startAt", cronArray[0]);
            component.set("v.interval", cronArray[1]);
        }
    }
})