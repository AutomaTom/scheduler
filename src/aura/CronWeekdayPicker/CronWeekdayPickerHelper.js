({    
    init : function(component) {
        
        component.set("v.nthRangeOptions", this.getNthRangeOptions());
        if(component.get("v.cron").includes("L")){
            component.find("last").set("v.value", true);
            this.enableSelectPicker(component);
        }else if(component.get("v.cron").includes("#") || component.get("v.cron").includes("L")){
            component.find("nthRange").set("v.value", true);
            this.enableNthRangePicker(component);
        }else{
        	component.getSuper().doHelperMethod("init", [component.getSuper()]);
        }
    },
    
    handleRadioOnChange : function(component, event) {
        
        if(event.getSource().getLocalId() === "last" && event.getSource().get("v.value")){    
            this.enableSelectPicker(component);
        }else if(event.getSource().getLocalId() === "nthRange" && event.getSource().get("v.value")){
            this.enableNthRangePicker(component);
        }
    },
    
	getNthRangeOptions : function() {
		
        return [{rowName:'First', rowOptions:[{label:'Sun',value:'1#1',selected:false},{label:'Mon',value:'2#1',selected:false},{label:'Tue',value:'3#1',selected:false},{label:'Wed',value:'4#1',selected:false},{label:'Thu',value:'5#1',selected:false},{label:'Fri',value:'6#1',selected:false},{label:'Sat',value:'7#1',selected:false}]},
                {rowName:'Second', rowOptions:[{label:'Sun',value:'1#2',selected:false},{label:'Mon',value:'2#2',selected:false},{label:'Tue',value:'3#2',selected:false},{label:'Wed',value:'4#2',selected:false},{label:'Thu',value:'5#2',selected:false},{label:'Fri',value:'6#2',selected:false},{label:'Sat',value:'7#2',selected:false}]},
                {rowName:'Third', rowOptions:[{label:'Sun',value:'1#3',selected:false},{label:'Mon',value:'2#3',selected:false},{label:'Tue',value:'3#3',selected:false},{label:'Wed',value:'4#3',selected:false},{label:'Thu',value:'5#3',selected:false},{label:'Fri',value:'6#3',selected:false},{label:'Sat',value:'7#3',selected:false}]},
                {rowName:'Fourth', rowOptions:[{label:'Sun',value:'1#4',selected:false},{label:'Mon',value:'2#4',selected:false},{label:'Tue',value:'3#4',selected:false},{label:'Wed',value:'4#4',selected:false},{label:'Thu',value:'5#4',selected:false},{label:'Fri',value:'6#4',selected:false},{label:'Sat',value:'7#4',selected:false}]},
                {rowName:'Fifth', rowOptions:[{label:'Sun',value:'1#5',selected:false},{label:'Mon',value:'2#5',selected:false},{label:'Tue',value:'3#5',selected:false},{label:'Wed',value:'4#5',selected:false},{label:'Thu',value:'5#5',selected:false},{label:'Fri',value:'6#5',selected:false},{label:'Sat',value:'7#5',selected:false}]}];        
	},
    
    getSelectOptions : function() {
      
        return [{label:"Sunday",value:"1L"},{label:"Monday",value:"2L"},{label:"Tuesday",value:"3L"},{label:"Wednesday",value:"4L"},{label:"Thursday",value:"5L"},{label:"Friday",value:"6L"},{label:"Saturday",value:"7L"}];
    },
    
    enableSelectPicker : function(component){
        
        var componentName = component.get("v.selectPicker");
        var params = {
              	        cron : component.get("v.cron"), 
            	    cronType : component.get("v.cronType"), 
               selectOptions : this.getSelectOptions(),
				  cronUpdate : component.getReference("c.handleCronUpdateEvent")
        };
        
        this.createPicker(component, [[componentName, params]]);
    },
    
    enableNthRangePicker : function(component) {

        var componentName = component.get("v.rangePicker");
        var params = {
              	        cron : component.get("v.cron"), 
            	    cronType : component.get("v.cronType"), 
            	rangeOptions : component.get("v.nthRangeOptions"),
				  cronUpdate : component.getReference("c.handleCronUpdateEvent")
        };
        
        this.createPicker(component, [[componentName, params]]);
	}
})