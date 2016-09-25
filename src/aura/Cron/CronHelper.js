({
    fireCronUpdateEvent : function (component) {
        var cronUpdateEvent = component.getEvent("cronUpdate");
        cronUpdateEvent.setParam("cron", component.get("v.cron"));
        cronUpdateEvent.setParam("cronType", component.get("v.cronType"));
        cronUpdateEvent.fire();
    }
})