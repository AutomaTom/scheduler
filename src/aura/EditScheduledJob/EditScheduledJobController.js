({
	init : function(component, event, helper) {
        
        var tabs = [
            { name : "Seconds", label : "Seconds", focus : true },
            { name : "Minutes", label : "Minutes" },
			{ name : "Hours", label : "Hours" },
            { name : "Days", label : "Days" },
            { name : "Months", label : "Months" },
            { name : "Weekdays", label : "Weekdays"},
            { name : "Years", label : "Years" }];

        component.set("v.tabs", tabs);
        
		var tabContent = [['c:CronSelect', helper.getSecondsParams(component)]];
        helper.createTabContent(component, tabContent);
        helper.validate(component);
	},
    
    handleChangeEvent : function (component, event, helper){
        helper.validate(component);
    },
    
    handleCronUpdateEvent : function (component, event, helper) {

        var cronType = event.getParam("cronType");
        switch(cronType){
            case "Second":
                component.set("v.seconds", event.getParam("cron"));
                break;
            case "Minute":
                component.set("v.minutes", event.getParam("cron"));
                break;
            case "Hour":
                component.set("v.hours", event.getParam("cron"));
                break;
            case "Day":
                component.set("v.days", event.getParam("cron"));
                break;
            case "Month":
                component.set("v.months", event.getParam("cron"));
                break;  
            case "Weekday":
                component.set("v.weekdays", event.getParam("cron"));
                break; 
            case "Year":
                component.set("v.years", event.getParam("cron"));
                break; 
        }
        
        component.set("v.scheduledJob.cron", 
			component.get("v.seconds") + " " +
			component.get("v.minutes") + " " +
			component.get("v.hours") + " " +
			component.get("v.days") + " " +
			component.get("v.months") + " " +
			component.get("v.weekdays") + " " +
			component.get("v.years"));
        
        helper.validate(component);
    },
    
    handleTabFocusEvent : function (component, event, helper) {
        
        var tabName = event.getParam("tabName");
        switch(tabName){
            case "Seconds": {
                helper.createTabContent(component, [["c:CronSelect", helper.getSecondsParams(component)]]);
                break;
            }
            case "Minutes": {
                helper.createTabContent(component, [["c:CronSelect", helper.getMinutesParams(component)]]);
                break;
            }
            case "Hours": {
                helper.createTabContent(component, [["c:CronPicker", helper.getHoursParams(component)]]);
                break;
            }
            case "Days": {
                helper.createTabContent(component, [["c:CronDayPicker", helper.getDayParams(component)]]);
                break;
            }
            case "Months": {
                helper.createTabContent(component, [["c:CronPicker", helper.getMonthParams(component)]]);
                break;
            }
            case "Weekdays": {
                helper.createTabContent(component, [["c:CronWeekdayPicker", helper.getWeekdayParams(component)]]);
                break;
            }
            case "Years": {
                helper.createTabContent(component, [["c:CronPicker", helper.getYearParams(component)]]);
                break;
            }
        }
    },
    
    handleTabBlurEvent : function (component, event, helper) {
        //Do Nothing
    }
})