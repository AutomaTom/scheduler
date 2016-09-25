({
    init : function(component) {
        
        if(component.get("v.cron") === "*"){
            component.find("all").set("v.value", true);
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else if(component.get("v.cron") === "?"){
            component.find("notApplicable").set("v.value", true);
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else if(component.get("v.cron").includes("/")){
            component.find("interval").set("v.value", true);
            this.enableIntervalPicker(component);
        }else{
            component.find("range").set("v.value", true);
            this.enableRangePicker(component);
        }      
    },
    
    handleRadioOnChange : function(component, event) {
        
        if(event.getSource().getLocalId() === "all" && event.getSource().get("v.value")){
			component.set("v.cron", "*");
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }else if(event.getSource().getLocalId() === "range" && event.getSource().get("v.value")){
            this.enableRangePicker(component);
        }else if(event.getSource().getLocalId() === "interval" && event.getSource().get("v.value")){
            this.enableIntervalPicker(component);
        }else if(event.getSource().getLocalId() === "notApplicable" && event.getSource().get("v.value")){
			component.set("v.cron", "?");
            component.set("v.picker", []);
            this.fireCronUpdateEvent(component);
        }  
    },
    
    enableRangePicker : function(component) {

        var componentName = component.get("v.rangePicker");
        var params = {
              	        cron : component.get("v.cron"), 
            	    cronType : component.get("v.cronType"), 
            	rangeOptions : component.get("v.rangeOptions"),
				  cronUpdate : component.getReference("c.handleCronUpdateEvent")
        };
        
        this.createPicker(component, [[componentName, params]]);
	},
    
	enableIntervalPicker : function(component) {

        var componentName = component.get("v.intervalPicker");; 
        var params = {
                        cron : component.get("v.cron"), 
                    cronType : component.get("v.cronType"), 
                     startAt : component.get("v.startAt"),
			  startAtOptions : component.get("v.startAtOptions"),
			     maxInterval : component.get("v.maxInterval"),
				  cronUpdate : component.getReference("c.handleCronUpdateEvent")
        };
        
        this.createPicker(component, [[componentName, params]]);
	},
    
    createPicker : function(component, picker) {

        $A.createComponents(picker,
            function(newComponents, status, statusMessagesList){
                component.set("v.picker", newComponents);
            });
    }
})