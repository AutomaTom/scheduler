({
    init : function(component, event, helper) {
        
        if(component.isConcrete()){
        	helper.init(component);
        }
    },
    
	handleRadioOnChange : function(component, event, helper) {

    	helper.handleRadioOnChange(component, event);
	}
})