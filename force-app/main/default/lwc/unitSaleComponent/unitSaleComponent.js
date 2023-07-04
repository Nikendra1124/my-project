import { LightningElement, api, track, wire } from 'lwc';

import salesforceEmail from '@salesforce/apex/SendEmail.SendEmailMethod';

export default class UnitSaleComponent extends LightningElement {

    @track viewButton = false;
    @track emailButton = false;
    @api
    recordId;git add

    url;
    onhandleClickView() {
        console.log('this.url ', this.url);
        this.url = 'https://ibirdsservices58-dev-ed.my.salesforce.com/apex/saleUnitVfPdf?id=' + this.recordId;

        console.log('this.url ', this.url);
        this.viewButton = true;
    }
    onhandleClickSendEmail() {
        this.emailButton = true;

        salesforceEmail({ localId: this.recordId }).then(res => {

        }).catch(error => {
            console.log('error found', error);
        });
    }


}