public with sharing class SaleUnitsClass {
    public SaleUnitsClass() {

    }
    @AuraEnabled
    public static List<Sale_Unit__c> getSaleRecordDetails(String recordId){
        system.debug('enter apex block');
        return new List<Sale_Unit__c>([SELECT Id, Total_Unit__c, Tender_Name__c, Sailing_Equipment__c,Owner.Email, LastModifiedById, Name FROM Sale_Unit__c where Id =: recordId]);
    }
    @AuraEnabled
    public static String SendEmail(List<Sale_Unit__c> EmailList){
        System.debug('Enter in apex method...!');
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
       
        mail.setToAddresses(new List<String> {EmailList[0].Owner.Email});
        mail.setSubject('Testing Emails');
        mail.setPlainTextBody(EmailList+'Dear Contact,please ready to sale unit if you have any issues');
        
        System.debug('mail : '+mail);
        Messaging.SendEmailResult[] results = Messaging.sendEmail(
                                 new Messaging.SingleEmailMessage[] { mail });
        System.debug('results : '+results);
        return 'null';
    }
}