({
	doInit : function(component, event, helper) {
        if(component.get("v.required")) {
			$A.util.addClass(component.find("formElement"), "slds-is-required");
        }
	},
    
    addError : function(component, event, helper) {
        var params = event.getParam("arguments");
        if (params) {
            var message = params.message;
            $A.createComponents(
                [
                    ["c.FormElementError",{ "message" : message }]
                ],
                function(newErrorComponents, status, statusMessagesList){
                    component.set("v.error", newErrorComponents);
                    $A.util.addClass(component.find("formElement"), "slds-has-error");
                });
        }
    },
    
    addErrors : function(component, event, helper) {
        var params = event.getParam("arguments");
        if (params) {
            var messages = params.messages;
            var errorComponents = [];
            messages.forEach(function(message){
                errorComponents.push(["c.FormElementError",{ "message" : message }]);
            });
            $A.createComponents(
                errorComponents, function(newErrorComponents, status, statusMessagesList){
                    component.set("v.error", newErrorComponents);
                    $A.util.addClass(component.find("formElement"), "slds-has-error");
                });
        }
    },
    
    clearError : function(component, event, helper) {
        component.set("v.error", []);
        $A.util.removeClass(component.find("formElement"), "slds-has-error");
    }
})