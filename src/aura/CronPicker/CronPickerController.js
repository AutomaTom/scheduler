({
    init : function(component, event, helper) {
        
        if(component.isConcrete()){
            helper.init(component);
        }
    },
    
	doHelperMethod : function(component, event, helper) {
        var params = event.getParam("arguments");
		helper[params.name].apply(helper, params.arguments);
    },
    
	handleRadioOnChange : function(component, event, helper) {

		helper.handleRadioOnChange(component, event);
	},
    
    handleCronUpdateEvent : function (component, event, helper) {
        component.set("v.cron", event.getParam("cron"));
        component.set("v.cronType", event.getParam("cronType"));
        helper.fireCronUpdateEvent(component);
    }
})