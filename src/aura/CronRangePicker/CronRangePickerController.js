({
    init : function(component, event, helper) {
        
        if(component.isConcrete()){
            helper.parseCronString(component);
    		helper.toCronString(component);
            helper.fireCronUpdateEvent(component);
            helper.validate(component);
		}
    },
    
    handleCheckboxChange : function(component, event, helper) {
        helper.toCronString(component);
		helper.fireCronUpdateEvent(component);
        helper.validate(component);
    }
})