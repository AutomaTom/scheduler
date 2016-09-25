public class ApexJobsController {
    
    public static final String SCHEDULED = 'Scheduled';
    public static final String NOT_SCHEDULED = 'Not Scheduled';
    
    public class ApexJobSettings {
        public Boolean selected {get;set;}
        public String status {get;set;}
        public Id cronJobDetailId {get;set;}
        public ApexJobSettings__c detail {get;set;}
        
        public ApexJobSettings(ApexJobSettings__c ajs){
            selected = false;
            status = NOT_SCHEDULED;
            detail = ajs;
        }
    }
    
    public Map<String, ApexJobSettings> apexJobSettings {get;set;}
    
    public ApexJobsController(){
		initApexJobSettings();
    }
    
    private void initApexJobSettings(){
        
        apexJobSettings = new Map<String, ApexJobSettings>();
        for(ApexJobSettings__c ajs : ApexJobSettings__c.getall().values()){
            apexJobSettings.put(ajs.Name, new ApexJobSettings(ajs));
        }
		for(CronJobDetail cjd : [SELECT Id, Name 
                                 FROM CronJobDetail 
                                 WHERE Name IN :apexJobSettings.keySet()]){
                                     
			if(apexJobSettings.containsKey(cjd.Name)){
				apexJobSettings.get(cjd.Name).status = SCHEDULED; 
                apexJobSettings.get(cjd.Name).cronJobDetailId = cjd.Id;
            }
		}
    }
    
    public void scheduleJobs(){
       
        for(ApexJobSettings ajs : apexJobSettings.values()){
            if(ajs.selected && !ajs.status.equals(SCHEDULED)){
                Type t = Type.forName(ajs.detail.ScheduledJobClass__c);
                System.schedule(ajs.detail.Name, 
					ajs.detail.CronExpression__c, 
					(Schedulable)t.newInstance());
            }
        }
        initApexJobSettings();
    }
    
    public void executeJobs(){

        for(ApexJobSettings ajs : apexJobSettings.values()){
            if(ajs.selected){
                Type t = Type.forName(ajs.detail.BatchJobClass__c);
                Database.executeBatch((Database.Batchable<sObject>)t.newInstance(), 
					(Integer)ajs.detail.BatchSize__c);
            }
        }
        initApexJobSettings();
    }
    
    public void abortJobs(){
        
        //Create a set of Jobs to cancel
        Set<String> jobsToCancel = new Set<String>();
        for(ApexJobSettings ajs : apexJobSettings.values()){
            if(ajs.selected && ajs.status.equals(SCHEDULED)){
                jobsToCancel.add(ajs.cronJobDetailId);
            }
        }

        //Find the Cron Triggers for the given Jobs and then abort 
        //each of them
        for(CronTrigger ct : [SELECT Id 
                              FROM CronTrigger 
                              WHERE CronJobDetailId IN :jobsToCancel]){
            
            System.abortJob(ct.Id);
        }
        
        initApexJobSettings();
    }
}