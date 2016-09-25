({
    afterRender : function(component, helper){
        
        this.superAfterRender();
		helper.parseCronString(component);
    }
})