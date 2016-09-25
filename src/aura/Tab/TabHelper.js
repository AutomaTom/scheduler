({
    makeTabActive : function(component){
        $A.util.addClass(component.find("listItem"), "slds-active");
        component.set("v.tabIndex", 0);
    },
    
    makeTabInactive : function(component){
        $A.util.removeClass(component.find("listItem"), "slds-active");
        component.set("v.tabIndex", -1);
    },
    
	fireClickEvent : function(component) {
        var clickEvent = component.getEvent("click");
        clickEvent.fire();
	}
})