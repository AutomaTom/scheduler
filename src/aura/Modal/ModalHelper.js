({
	toggleVisibility : function(component) {
        var modal = component.find("sldsModal");
        $A.util.toggleClass(modal, "slds-fade-in-open");
        var modalBackdrop = component.find("sldsModalBackdrop");
        $A.util.toggleClass(modalBackdrop, "slds-modal-backdrop--open");
	}
})