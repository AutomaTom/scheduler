({
	init : function(component, event, helper) {

        helper.fireCronUpdateEvent(component);
	},

	handleChangeEvent : function(component, event, helper) {
        
        if(event.getSource().getLocalId() === "cronSelect"){
            helper.fireCronUpdateEvent(component);
        }
	}
})