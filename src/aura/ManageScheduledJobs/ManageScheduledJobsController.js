({
	init : function(component, event, helper) {
        
        component.set("v.modal", component.find("editJobModal"));
        helper.getScheduledJobs(component);
		helper.newScheduledJobInstance(component);
	},
    
    doNewJob : function(component, event, helper){
        helper.newScheduledJobInstance(component);
        var newModalBody = [["c:EditScheduledJob", {
            scheduledJob : component.getReference("v.scheduledJob")
        }]];
		helper.setModalBody(component, newModalBody);
    },

    doDeleteJobs : function(component, event, helper){
        if(helper.isJobSelected(component.get("v.scheduledJobs"))){
            helper.doDeleteJobs(component);
        }else{
            helper.showErrors(component, [{
                message:"You must select at least one Scheduled Job"
            }]);   
        }
    },
    
    doAbortJobs : function(component, event, helper){
        if(helper.isJobSelected(component.get("v.scheduledJobs"))){
            helper.doAbortJobs(component);
        }else{
            helper.showErrors(component, [{
                message:"You must select at least one Scheduled Job"
            }]);    
        }
    },
    
    doScheduleJobs : function(component, event, helper){
        if(helper.isJobSelected(component.get("v.scheduledJobs"))){
            helper.doScheduleJobs(component);
        }else{
            helper.showErrors(component, [{
                message:"You must select at least one Scheduled Job"
            }]);  
        }
    },

    saveEdit : function(component, event, helper){

        if(component.get("v.editJobComponent").get("v.isValid")){
			helper.doUpsertJob(component);
    	    component.get("v.modal").close();
        }
    },
    
    handleClickEvent : function(component, event, helper){

		var name = event.getSource().get("v.label");
        var scheduledJobs = component.get("v.scheduledJobs");
        scheduledJobs.forEach(function(scheduledJob){
            if(scheduledJob.name === name){
                component.set("v.scheduledJob", scheduledJob);
                var newModalBody = [["c:EditScheduledJob", {
                    isEdit : true,
                    scheduledJob : component.getReference("v.scheduledJob")
                }]];
				helper.setModalBody(component, newModalBody);
            } 
        });
    },
    
    handleChangeEvent : function(component, event, helper){
        
        if(event.getSource().getLocalId() === "selectAll"){
            var scheduledJobs = component.get("v.scheduledJobs");
            scheduledJobs.forEach(function(scheduledJob){
               scheduledJob.selected = event.getSource().get("v.value"); 
            });
            component.set("v.scheduledJobs", scheduledJobs);
        } 
        else if (event.getSource().getLocalId() === "selected" 
                 && !event.getSource().get("v.value")) {
            component.find("selectAll").set("v.value", false);
        }
    }
})