({
    rerender : function(component, helper){
        if(component.get("v.focus")){
			helper.makeTabActive(component);
        } else {
			helper.makeTabInactive(component);
        }
        return this.superRerender();
    }
})