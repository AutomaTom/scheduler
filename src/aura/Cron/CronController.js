({
	doHelperMethod : function(component, event, helper) {
        var params = event.getParam("arguments");
		helper[params.name].apply(helper, params.arguments);
    }
})