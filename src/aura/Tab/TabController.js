({
    init : function(component, event, helper) {
        if(component.get("v.focus")){
            helper.makeTabActive(component);
        }
    },
    
	handleClickEvent : function(component, event, helper) {
        helper.fireClickEvent(component);
	}
})