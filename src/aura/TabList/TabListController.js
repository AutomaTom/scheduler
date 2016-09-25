({
    init : function(component, event, helper) {
      
        var tabs = component.get("v.tabs");
        tabs.forEach(function(tab){
            tab.addHandler("click", component, "c.handleClickEvent"); 
        });
        
    },
    
	handleClickEvent : function(component, event, helper) {
        
		var tabs = component.get("v.tabs");
        tabs.forEach(function(tab){
            if (event.getSource().getGlobalId() == tab.getGlobalId()){
                tab.set("v.focus", true); 
                helper.fireTabFocusEvent(component, tab.get("v.name"));
            } else if (tab.get("v.focus")){
                tab.set("v.focus", false);
                helper.fireTabBlurEvent(component, tab.get("v.name"));
            }
        });
	}
})