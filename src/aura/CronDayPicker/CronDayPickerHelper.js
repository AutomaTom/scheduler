({
	init : function(component) {
        if(component.get("v.cron") === "L"){
            component.find("lastDay").set("v.value", true);
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else if(component.get("v.cron") === "LW"){
            component.find("lastWeekday").set("v.value", true);
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else{
			component.getSuper().doHelperMethod("init", [component.getSuper()]);
        } 
	},
    
    handleRadioOnChange : function(component, event){
        
        if(event.getSource().getLocalId() === "lastDay" && event.getSource().get("v.value")){    
			component.set("v.cron", "L");
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else if(event.getSource().getLocalId() === "lastWeekday" && event.getSource().get("v.value")){
			component.set("v.cron", "LW");
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }
    }
})