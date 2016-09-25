({
    showErrors : function(component, errors){
        console.log(errors);
        var helper = this;
        var errorMessages = [];
        errors.forEach(function(error){
            errorMessages.push(["aura:unescapedHtml", {
                value : "<p>" + error.message + "</p>"
            }]);
        });
        helper.setPromptBody(component, errorMessages);
    },
    
    setPromptBody : function(component, promptBodyComponents){
        $A.createComponents(promptBodyComponents,
			function(newComponents, status, statusMessagesList){
                var prompt = component.find("prompt");
                prompt.set("v.body", newComponents);
                prompt.open();
            });
    },
    
    isJobSelected : function(scheduledJobs){
        var isSelected = false;
        scheduledJobs.forEach(function(scheduledJob){
            if(scheduledJob.selected){
                isSelected = true;
            }
        });
        return isSelected;
    },
    
    setModalBody : function(component, modalBodyComponents){
        $A.createComponents(modalBodyComponents,
			function(newComponents, status, statusMessagesList){
                component.set("v.editJobComponent", newComponents[0]);
                component.get("v.modal").set("v.body", newComponents);
                component.get("v.modal").open();
            });
    },
    
	getScheduledJobs : function(component) {
        
        var action = component.get("c.getScheduledJobs");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.scheduledJobs", response.getReturnValue());
            }
            else if (component.isValid() && state === "ERROR") {
                helper.showErrors(component, response.getError());
            }
            component.find("spinner").hide();
        });
        component.find("spinner").show();
        $A.enqueueAction(action);
	},
    
    doUpsertJob : function(component){
        
        var helper = this;
		var action = component.get("c.upsertJob");
        action.setParam("jsonString", JSON.stringify(component.get("v.scheduledJob")));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.scheduledJobs", response.getReturnValue());
                component.find("selectAll").set("v.value", false);
            }
            else if (component.isValid() && state === "ERROR") {
                helper.showErrors(component, response.getError());
            }
			component.find("spinner").hide();
        });
        component.find("spinner").show();
        $A.enqueueAction(action); 
    },
    
    doDeleteJobs : function(component){
        
        var helper = this;
		var action = component.get("c.deleteJobs");
        action.setParam("jsonString", JSON.stringify(component.get("v.scheduledJobs")));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.scheduledJobs", response.getReturnValue());
                component.find("selectAll").set("v.value", false);
            }
            else if (component.isValid() && state === "ERROR") {
                helper.showErrors(component, response.getError());
            }
            component.find("spinner").hide();
        });
        component.find("spinner").show();
        $A.enqueueAction(action); 
    },
    
    doAbortJobs : function(component){
        
        var helper = this;
		var action = component.get("c.abortJobs");
        action.setParam("jsonString", JSON.stringify(component.get("v.scheduledJobs")));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.scheduledJobs", response.getReturnValue());
                component.find("selectAll").set("v.value", false);
            }
            else if (component.isValid() && state === "ERROR") {
                helper.showErrors(component, response.getError());
            }
            component.find("spinner").hide();
        });
        component.find("spinner").show();
        $A.enqueueAction(action);         
    },
    
    doScheduleJobs : function(component){
        
        var helper = this;
		var action = component.get("c.scheduleJobs");
        action.setParam("jsonString", JSON.stringify(component.get("v.scheduledJobs")));
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.scheduledJobs", response.getReturnValue());
                component.find("selectAll").set("v.value", false);
            }
            else if (component.isValid() && state === "ERROR") {
                helper.showErrors(component, response.getError());
            }
            component.find("spinner").hide();
        });
        component.find("spinner").show();
        $A.enqueueAction(action);  
    },
    
    newScheduledJobInstance : function(component) {
        
        var scheduledJob = { 
            recordId : null,
            name : null, 
            schedulableClass : null, 
            status : "Not Scheduled",
            cron : "0 0 * * * ?" 
        };
        component.set("v.scheduledJob", scheduledJob);
        
    }
})