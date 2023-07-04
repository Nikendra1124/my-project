import { LightningElement,track, wire, api } from 'lwc';

import getSaleRecordDetails from '@salesforce/apex/SaleUnitsClass.getSaleRecordDetails';
import SendEmail from '@salesforce/apex/SaleUnitsClass.SendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SaleUnitComponent extends LightningElement {

//Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
@track isModalOpen = false;
saleDetails;
error;
@api recordId;
openModal() {
    // to open modal set isModalOpen tarck value as true
    this.isModalOpen = true;
    getSaleRecordDetails({recordId : this.recordId })
    .then((result) => {
            this.saleDetails = result;
            console.log('result : ',result);
        })
        .catch((error) => {
            this.error = error;
           
        });
}
closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
}
submitDetails1() {
    console.log('@@@@@');
    console.log(this.saleDetails[0].Owner.Email);
    // to close modal set isModalOpen tarck value as false
    //Add your code to call apex method or do some processing
   // const selectedEmails = this.listOfEmail;
    SendEmail({
        EmailList: this.saleDetails
    })
    .then(result =>{
        var toast = new ShowToastEvent({
        'title': 'Successfull',
        'message': 'Email Sent Successfully',
        'variant': 'success'
    });
    this.dispatchEvent(toast);
    }).catch(error =>{
        Console.log(error);
    })

    this.isModalOpen = false;
}
}