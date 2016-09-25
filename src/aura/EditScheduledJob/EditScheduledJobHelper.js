({
    validate : function(component){
        
        var isValid = true;
        var scheduledJob = component.get("v.scheduledJob");
        var hours = component.get("v.hours");
        var days = component.get("v.days");
        var months = component.get("v.months");
        var weekdays = component.get("v.weekdays");
        
        var cronErrors = [];
        if(!hours || hours.length === 0){
            cronErrors.push("You must specify the hour(s) on which the scheduled job will run");
        }
        if(!days || days.length === 0){
            cronErrors.push("You must specify the day(s) on which the scheduled job will run");
        }
        if(!months || months.length === 0){
            cronErrors.push("You must specify the month(s) on which the scheduled job will run");
        }
        if(!weekdays || weekdays.length === 0){
            cronErrors.push("You must specify the weekday(s) on which the scheduled job will run");
        }
        if(days && weekdays && days === "?" && weekdays === "?"){
            cronErrors.push("You must specify either day(s) or weekday(s) on which the scheduled job will run - deselect N/A for one of them");
        }
		if(days && weekdays && days.length > 0 && weekdays.length > 0 && days !== "?" && weekdays !== "?"){
            cronErrors.push("You can only specify day(s) or weekday(s) - select N/A for one of them");
        }
        if(cronErrors.length > 0){
            component.find("Cron").addErrors(cronErrors);
            isValid = false;
        }else{
            component.find("Cron").clearError();            
        }
        
        if(!scheduledJob.name || scheduledJob.name.length === 0){
			component.find("Name").addError("This field is required");
            isValid = false;
        }else{
            component.find("Name").clearError();            
        }
        
        if(!scheduledJob.schedulableClass || scheduledJob.schedulableClass.length === 0){
			component.find("Class").addError("This field is required");
            isValid = false;
        }else{
            component.find("Class").clearError();            
        }

        component.set("v.isValid", isValid);
    },
    
    createTabContent : function(component, tabContent) {
        if (tabContent){
            $A.createComponents(tabContent,
                function(newTabContent, status, statusMessagesList){
                    component.set("v.tabContent", newTabContent);
                });
    	}    
    },
    
    getMinutesParams : function(component) {
        return {
            cron : component.get("v.minutes"), 
            cronType : "Minute", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            selectOptions : this.getSelectOptions()
		};
    },
    
    parseCronString : function(component) {
        
        var scheduledJob = component.get("v.scheduledJob");
        if(scheduledJob.cron){
            var cronArray = scheduledJob.cron.split(" ");
            component.set("v.seconds", cronArray[0] ? cronArray[0] : "");
            component.set("v.minutes", cronArray[1] ? cronArray[1] : "");
            component.set("v.hours", cronArray[2] ? cronArray[2] : "");
            component.set("v.days", cronArray[3] ? cronArray[3] : "");
            component.set("v.months", cronArray[4] ? cronArray[4] : "");
            component.set("v.weekdays", cronArray[5] ? cronArray[5] : "");
            component.set("v.years", cronArray[6] ? cronArray[6] : "");
        }
    },
    
    getSecondsParams : function(component) {
        return {
            cron : component.get("v.seconds"), 
            cronType : "Second", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            selectOptions : this.getSelectOptions()
		};
    },
                              
    getSelectOptions : function() {
        var selectOptions = [];
        for (var i = 0; i < 60; i++){
            selectOptions.push({
                label : String(i),
                value : String(i)
            });
        }
        return selectOptions;
    },
    
    getHoursParams : function(component) {
        
        return {
            cron : component.get("v.hours"), 
            cronType : "Hour", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            rangeOptions : this.getHoursRangeOptions(),
            startAt : 0,
            startAtOptions : this.getHoursStartAtOptions(),
            maxInterval : 23
		};
    },
    
	getHoursRangeOptions : function() {
		
        return [{rowOptions:[{label:'0 AM',value:'0',selected:false},{label:'1 AM',value:'1',selected:false},{label:'2 AM',value:'2',selected:false},{label:'3 AM',value:'3',selected:false},{label:'4 AM',value:'4',selected:false},{label:'5 AM',value:'5',selected:false}]},
                {rowOptions:[{label:'6 AM',value:'6',selected:false},{label:'7 AM',value:'7',selected:false},{label:'8 AM',value:'8',selected:false},{label:'9 AM',value:'9',selected:false},{label:'10 AM',value:'10',selected:false},{label:'11 AM',value:'11',selected:false}]},
                {rowOptions:[{label:'12 PM',value:'12',selected:false},{label:'13 PM',value:'13',selected:false},{label:'14 PM',value:'14',selected:false},{label:'15 PM',value:'15',selected:false},{label:'16 PM',value:'16',selected:false},{label:'17 PM',value:'17',selected:false}]},
                {rowOptions:[{label:'18 PM',value:'18',selected:false},{label:'19 PM',value:'19',selected:false},{label:'20 PM',value:'20',selected:false},{label:'21 PM',value:'21',selected:false},{label:'22 PM',value:'22',selected:false},{label:'23 PM',value:'23',selected:false}]}];        
	},
    
    getHoursStartAtOptions : function() {
        return [{label:'0 AM',value:'0'},{label:'1 AM',value:'1'},{label:'2 AM',value:'2'},{label:'3 AM',value:'3'},{label:'4 AM',value:'4'},{label:'5 AM',value:'5'},
				{label:'6 AM',value:'6'},{label:'7 AM',value:'7'},{label:'8 AM',value:'8'},{label:'9 AM',value:'9'},{label:'10 AM',value:'10'},{label:'11 AM',value:'11'},
                {label:'12 PM',value:'12'},{label:'13 PM',value:'13'},{label:'14 PM',value:'14'},{label:'15 PM',value:'15'},{label:'16 PM',value:'16'},{label:'17 AM',value:'17'},
                {label:'18 PM',value:'18'},{label:'19 PM',value:'19'},{label:'20 PM',value:'20'},{label:'21 PM',value:'21'},{label:'22 PM',value:'22'},{label:'23 AM',value:'23'}];
    },
    
    getDayParams : function(component) {
        
        return {
            cron : component.get("v.days"), 
            cronType : "Day", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            rangeOptions : this.getDayRangeOptions(),
            startAt : 1,
            startAtOptions : this.getDayStartAtOptions(),
            maxInterval : 31,
            showNotApplicable : true
		};
    },
    
	getDayRangeOptions : function() {
		
        return [{rowOptions:[{label:'1',value:'1',selected:false},{label:'2',value:'2',selected:false},{label:'3',value:'3',selected:false},{label:'4',value:'4',selected:false},{label:'5',value:'5',selected:false},{label:'6',value:'6',selected:false},{label:'7',value:'7',selected:false}]},
                {rowOptions:[{label:'8',value:'8',selected:false},{label:'9',value:'9',selected:false},{label:'10',value:'10',selected:false},{label:'11',value:'11',selected:false},{label:'12',value:'12',selected:false},{label:'13',value:'13',selected:false},{label:'14',value:'14',selected:false}]},
            	{rowOptions:[{label:'15',value:'15',selected:false},{label:'16',value:'16',selected:false},{label:'17',value:'17',selected:false},{label:'18',value:'18',selected:false},{label:'19',value:'19',selected:false},{label:'20',value:'20',selected:false},{label:'21',value:'21',selected:false}]},
                {rowOptions:[{label:'22',value:'22',selected:false},{label:'23',value:'23',selected:false},{label:'24',value:'24',selected:false},{label:'25',value:'25',selected:false},{label:'26',value:'26',selected:false},{label:'27',value:'27',selected:false},{label:'28',value:'28',selected:false}]},
                {rowOptions:[{label:'29',value:'29',selected:false},{label:'30',value:'30',selected:false},{label:'31',value:'31',selected:false}]}];        
	},
    
    getDayStartAtOptions : function() {
        return [{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'},{label:'5',value:'5'},{label:'6',value:'6'},{label:'7',value:'7'},
                {label:'8',value:'8'},{label:'9',value:'9'},{label:'10',value:'10'},{label:'11',value:'11'},{label:'12',value:'12'},{label:'13',value:'13'},{label:'14',value:'14'},
                {label:'15',value:'15'},{label:'16',value:'16'},{label:'17',value:'17'},{label:'18',value:'18'},{label:'19',value:'19'},{label:'20',value:'20'},{label:'21',value:'21'},
                {label:'22',value:'22'},{label:'23',value:'23'},{label:'24',value:'24'},{label:'25',value:'25'},{label:'26',value:'26'},{label:'27',value:'27'},{label:'28',value:'28'},
                {label:'29',value:'29'},{label:'30',value:'30'},{label:'31',value:'31'}];
    },
    
    getWeekdayParams : function(component) {
        
        return {
            cron : component.get("v.weekdays"), 
            cronType : "Weekday", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            rangeOptions : this.getWeekdayRangeOptions(),
            startAt : 1,
            startAtOptions : this.getWeekdayStartAtOptions(),
            maxInterval : 7,
            showNotApplicable : true
		};
    },
    
	getWeekdayRangeOptions : function() {
		
        return [{rowOptions:[{label:'Sun',value:'1',selected:false},{label:'Mon',value:'2',selected:false},{label:'Tue',value:'3',selected:false},{label:'Wed',value:'4',selected:false},{label:'Thu',value:'5',selected:false},{label:'Fri',value:'6',selected:false},{label:'Sat',value:'7',selected:false}]}];        
	},
    
    getWeekdayStartAtOptions : function() {
        return [{label:'Sunday',value:'1'},{label:'Monday',value:'2'},{label:'Tuesday',value:'3'},{label:'Wednesday',value:'4'},{label:'Thursday',value:'5'},{label:'Friday',value:'6'},{label:'Saturday',value:'7'}];
    },
    
    getMonthParams : function(component) {
        
        return {
            cron : component.get("v.months"), 
            cronType : "Month", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            rangeOptions : this.getMonthRangeOptions(),
            startAt : 1,
            startAtOptions : this.getMonthStartAtOptions(),
            maxInterval : 12
		};
    },
    
	getMonthRangeOptions : function() {
		
        return [{rowOptions:[{label:'January',value:'1',selected:false},{label:'February',value:'2',selected:false},{label:'March',value:'3',selected:false},{label:'April',value:'4',selected:false},{label:'May',value:'5',selected:false},{label:'June',value:'6',selected:false}]},
                {rowOptions:[{label:'July',value:'7',selected:false},{label:'August',value:'8',selected:false},{label:'September',value:'9',selected:false},{label:'October',value:'10',selected:false},{label:'November',value:'11',selected:false},{label:'December',value:'12',selected:false}]}];        
	},
    
    getMonthStartAtOptions : function() {
        return [{label:'January',value:'1'},{label:'February',value:'2'},{label:'March',value:'3'},{label:'April',value:'4'},{label:'May',value:'5'},{label:'June',value:'6'},
				{label:'July',value:'7'},{label:'August',value:'8'},{label:'September',value:'9'},{label:'October',value:'10'},{label:'November',value:'11'},{label:'December',value:'12'}];
    },
    
    getYearParams : function(component) {
        
        return {
            cron : component.get("v.years"), 
            cronType : "Year", 
            cronUpdate : component.getReference("c.handleCronUpdateEvent"),
            rangeOptions : this.getYearRangeOptions(),
            startAt : 1,
            startAtOptions : this.getYearStartAtOptions(),
            maxInterval : 2099
		};
    },
    
	getYearRangeOptions : function() {
		
        var options = [];
        var x = 0;
        var year = (new Date()).getFullYear();
        while(year < 2100){
            options.push({rowOptions:[]});
            for(var y = 0; y < 6 && year < 2100; y++){
                options[x].rowOptions.push({
                       label : String(year),
                       value : String(year),
                    selected : false
                });
                year++;
            }
            x++;
        }
		return options;        
	},
    
    getYearStartAtOptions : function() {
        
        var options = [];
        for(var year = (new Date()).getFullYear(); year < 2100; year++){
            options.push({
				label : String(year),
				value : String(year)
            });
        }
		return options;  
    }
})