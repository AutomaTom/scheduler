global class DemoBatchJob implements Database.Batchable<sObject>{

    global Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator('SELECT Id, FirstName, LastName FROM Contact');
    }

    global void execute(Database.BatchableContext bc, List<sObject> scope){
		for(sobject s : scope){
			System.debug(JSON.serializePretty(s)); 
		}
    }

	global void finish(Database.BatchableContext bc){}
}