global class DemoScheduledJob implements Schedulable {
	global void execute(SchedulableContext sc) {
		DemoBatchJob b = new DemoBatchJob(); 
		Database.executebatch(b);
	}
}