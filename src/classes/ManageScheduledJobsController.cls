public class ManageScheduledJobsController {

    public static final String SCHEDULED = 'Scheduled';
    public static final String NOT_SCHEDULED = 'Not Scheduled';
    
    public class ScheduledJob {
        
        @AuraEnabled
        public Id recordId {get;set;}
        @AuraEnabled
        public Boolean selected {get;set;}
        @AuraEnabled
        public String status {get;set;}
        @AuraEnabled
        public Id cronJobDetailId {get;set;}
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String schedulableClass {get;set;}
        @AuraEnabled
        public String cron {get;set;}
        
        public ScheduledJob(ApexJobSettings__c ajs){
            recordId = ajs.id;
            selected = false;
            status = NOT_SCHEDULED;
            name = ajs.Name;
            schedulableClass = ajs.ScheduledJobClass__c;
            cron = ajs.CronExpression__c;
        }
        
        public ApexJobSettings__c toSObject(){
            return new ApexJobSettings__c(
            	Id = this.recordId,
                Name = this.name,
                ScheduledJobClass__c = schedulableClass,
                CronExpression__c = cron
            );
        }
    }
    
    @AuraEnabled
    public static List<ScheduledJob> getScheduledJobs(){
        
        Map<String, ScheduledJob> scheduledJobs = new Map<String, ScheduledJob>();
        for(ApexJobSettings__c ajs : ApexJobSettings__c.getall().values()){
            scheduledJobs.put(ajs.Name, new ScheduledJob(ajs));
        }
		for(CronJobDetail cjd : [SELECT Id, Name 
                                 FROM CronJobDetail 
                                 WHERE Name IN :scheduledJobs.keySet()]){
                                     
			if(scheduledJobs.containsKey(cjd.Name)){
				scheduledJobs.get(cjd.Name).status = SCHEDULED; 
                scheduledJobs.get(cjd.Name).cronJobDetailId = cjd.Id;
            }
		}

        return scheduledJobs.values();
    }
    
    @AuraEnabled
    public static List<ScheduledJob> scheduleJobs(String jsonString){
        
        List<ScheduledJob> scheduledJobs = (List<ScheduledJob>)JSON.deserialize(jsonString, List<ScheduledJob>.class);
        
        for(ScheduledJob sj : scheduledJobs){
            if(sj.selected && !sj.status.equals(SCHEDULED)){
                Type t = Type.forName(sj.schedulableClass);
                System.schedule(sj.name, sj.cron, 
					(Schedulable)t.newInstance());
            }
        }
        return getScheduledJobs();
    }
    
    @AuraEnabled
    public static List<ScheduledJob> abortJobs(String jsonString){
        
		List<ScheduledJob> scheduledJobs = (List<ScheduledJob>)JSON.deserialize(jsonString, List<ScheduledJob>.class);
        
        //Create a set of Jobs to cancel
        Set<String> jobsToCancel = new Set<String>();
        for(ScheduledJob sj : scheduledJobs){
            if(sj.selected && sj.status.equals(SCHEDULED)){
                jobsToCancel.add(sj.cronJobDetailId);
            }
        }

        //Find the Cron Triggers for the given Jobs and then abort 
        //each of them
        for(CronTrigger ct : [SELECT Id 
                              FROM CronTrigger 
                              WHERE CronJobDetailId IN :jobsToCancel]){
            
            System.abortJob(ct.Id);
        }
        
        return getScheduledJobs();
    }
    
    @AuraEnabled
    public static List<ScheduledJob> upsertJob(String jsonString){

        ScheduledJob sj = (ScheduledJob)JSON.deserialize(jsonString, ScheduledJob.class);
        upsert sj.toSObject();
        
        if(sj.status.equals(SCHEDULED)){
            sj.selected = true;
            jsonString = JSON.serialize(new List<ScheduledJob>{sj});
			abortJobs(jsonString);
            sj.status = NOT_SCHEDULED;
            jsonString = JSON.serialize(new List<ScheduledJob>{sj});
            return scheduleJobs(jsonString); 
        } else {
            return getScheduledJobs();
        }
    }
    
    @AuraEnabled
    public static List<ScheduledJob> deleteJobs(String jsonString){
        
        abortJobs(jsonString);
        
        List<ApexJobSettings__c> jobsToDelete = new List<ApexJobSettings__c>();
        List<ScheduledJob> scheduledJobs = (List<ScheduledJob>)JSON.deserialize(jsonString, List<ScheduledJob>.class);
        for(ScheduledJob sj : scheduledJobs){
            if(sj.selected){
            	jobsToDelete.add(sj.toSObject());
            }
        }
        delete jobsToDelete;
        
        return getScheduledJobs();
    }
}