({    
	toCronString : function(component) {
        
        var rangeOptions = component.get("v.rangeOptions");
        var selectedOptions = [];
        rangeOptions.forEach(function(x){
            x.rowOptions.forEach(function(y){
                if(y.selected){
					selectedOptions.push(y.value);
                }
            });
        });
        component.set("v.cron", selectedOptions.toString());
	},
    
    getRangeOptionIndex : function(rangeOptions, rangeOption){

        var index;
        for(var x = 0; x < rangeOptions.length; x++){
            for(var y = 0; y < rangeOptions[x].rowOptions.length; y++){
                if(rangeOptions[x].rowOptions[y].value == rangeOption){
                    index = { "x" : x, "y" : y };
                    return index; 
                }
            }
        }
    },
    
    parseCronString : function(component){
        
        var helper = this;
        var cron = component.get("v.cron");
        var rangeOptions = component.get("v.rangeOptions");
        var cronArray = cron.split(",");
        var selectedOptions = [];
        cronArray.forEach(function(item){
            if(item.includes("-")){
                var cronRange = item.split("-");
                var start = helper.getRangeOptionIndex(rangeOptions, cronRange[0]);
                var end = helper.getRangeOptionIndex(rangeOptions, cronRange[1]);
                var x = start.x;
                var y = start.y;
                while(x <= end.x && y <= end.y){
                    selectedOptions.push(rangeOptions[x].rowOptions[y].value);
                    if(y++ >= rangeOptions[x].length){
                        x++;
                        y = 0;
                    }
                }
                
            }else{
                selectedOptions.push(item);
            } 
        });
        
        selectedOptions.forEach(function(option){
            rangeOptions.forEach(function(x){
                x.rowOptions.forEach(function(y){
                    if(y.value == option){
                        y.selected = true;  
                    }
                });
            });
        });
        
        component.set("v.rangeOptions", rangeOptions);
    },
    
    validate : function(component){
        
        var isValid = false;
        var rangeOptions = component.get("v.rangeOptions");
        for(var x = 0; x < rangeOptions.length; x++){
            for(var y = 0; y < rangeOptions[x].rowOptions.length; y++){
                if(rangeOptions[x].rowOptions[y].selected){
                    isValid = true;
                }
            }
        }
        
        if(isValid){
            component.find("rangeOptions").clearError();
        }else{
            component.find("rangeOptions").addError("Please select one or more options");
        }
    }
})