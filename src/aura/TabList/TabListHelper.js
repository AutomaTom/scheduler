({
	fireTabBlurEvent : function(component, tabName) {
        var tabBlurEvent = component.getEvent("tabBlur");
        tabBlurEvent.setParam("tabName", tabName);
        tabBlurEvent.fire();
	},
    
	fireTabFocusEvent : function(component, tabName) {
        var tabFocusEvent = component.getEvent("tabFocus");
        tabFocusEvent.setParam("tabName", tabName);
        tabFocusEvent.fire();	
	}
})