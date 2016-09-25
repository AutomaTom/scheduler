({
    init : function(component, event, helper) {
        
        helper.parseCronString(component);
        helper.getIntervalOptions(component);
        helper.toCronString(component);
        helper.fireCronUpdateEvent(component);
    },
    
    handleChangeEvent : function(component, event, helper) {
        
        if(event.getSource().getLocalId() === "startAt"){
			helper.getIntervalOptions(component);
        }
        helper.toCronString(component);    
		helper.fireCronUpdateEvent(component);
    }
})