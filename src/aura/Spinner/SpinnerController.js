({
	showSpinner : function(component, event, helper) {
        var spinner = component.find("spinner");
        if($A.util.hasClass(spinner, "slds-hide")){
            $A.util.removeClass(spinner, "slds-hide");
            $A.util.addClass(spinner, "slds-spinner_container");
        }
	},
    
    hideSpinner : function(component, event, helper) {
        var spinner = component.find("spinner");
        if($A.util.hasClass(spinner, "slds-spinner_container")){
            $A.util.removeClass(spinner, "slds-spinner_container");
            $A.util.addClass(spinner, "slds-hide");
        }      
    }
})