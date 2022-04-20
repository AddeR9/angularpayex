import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpEventType} from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  summa = 40;
  hrefPath = ""
  paymentStatus = "";
  paymentOrderId = ""
  totalSumma = 0;
  generateString = (Math.random() + 1).toString(36).substring(7);
  interval: any;


  
  postData = {
    paymentorder: {
    operation: "Purchase",
    currency: "SEK",
    amount: 15000,
    vatAmount: 375,
    description: "Test Purchase",
    userAgent: "Mozilla/5.0...",
    language: "sv-SE",
    productName: "Checkout3",
    urls: {
      hostUrls: [
        "https://example.com",
        "https://example.net"
      ],
      paymentUrl: "https://example.com/perform-payment",
      completeUrl: "https://example.com/payment-completed",
      cancelUrl: "https://example.com/payment-cancelled",
      callbackUrl: "https://a8fb-158-174-100-200.eu.ngrok.io",
      termsOfServiceUrl: "https://example.com/termsandconditoons.pdf"
    },
    payeeInfo: {
      payeeId: "3684be11-32a0-4c6c-8237-9c209550983b",
      payeeReference: this.generateString,
      payeeName: "Merchant1",
      productCategory: "A123",
      orderReference: "or-123456",
      subsite: "MySubsite"
    },
    payer: {
      digitalProducts: false,
      firstName: "Leia",
      lastName: "ali",
      email: "leia@payex.com",
      msisdn: "+46787654321",
      shippingAddress: {
        firstName: "firstname/companyname",
        lastName: "lastname",
        email: "karl.anderssson@mail.se",
        msisdn: "+46759123456",
        streetAddress: "string",
        coAddress: "string",
        city: "Solna",
        zipCode: "17674",
        countryCode: "SE"
      },
      billingAddress: {
        firstName: "firstname/companyname",
        lastName: "lastname",
        email: "karl.anderssson@mail.se",
        msisdn: "+46759123456",
        streetAddress: "string",
        coAddress: "string",
        city: "Solna",
        zipCode: "17674",
        countryCode: "SE"
      },
      accountInfo: {
        accountAgeIndicator: "04",
        accountChangeIndicator: "04",
        accountPwdChangeIndicator: "01",
        shippingAddressUsageIndicator: "01",
        shippingNameIndicator: "01",
        suspiciousAccountActivity: "01"
      }
    },
    swish: {
      paymentRestrictedToAgeLimit: 18,
      paymentRestrictedToSocialSecurityNumber: "199710202392"
    },
    riskIndicator: {
      deliveryEmailAddress: "olivia.nyhuus@payex.com",
      deliveryTimeFrameIndicator: "01",
      preOrderDate: "19801231",
      preOrderPurchaseIndicator: "01",
      shipIndicator: "01",
      giftCardPurchase: false,
      reOrderPurchaseIndicator: "01",
      pickUpAddress: {
        name: "Olivia Nyhus",
        streetAddress: "Saltnestoppen 43",
        coAddress: "",
        city: "Saltnes",
        zipCode: "1642",
        countryCode: "NO"
      }
    }
  }
}
  

  
  data!: string;
  baseUrl:string = "https://api.externalintegration.payex.com"
  callbackUrl:string = "https://a8fb-158-174-100-200.eu.ngrok.io"

  constructor(private dataService: DataService, private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  paymentOrder() {
    this.dataService.paymentOrder(this.postData).subscribe((response)=>{
    this.hrefPath = response.operations[2].href;
    this.paymentOrderId = response.paymentOrder.id;
    this.data = response.paymentOrder.id;
    this.checkOut();
    this.checkPayment();
    });
  }

  checkOut() {
    window.open(this.hrefPath);
  }

  checkPayment() {
    this.interval = setInterval( () => {
      this.dataService.checkPayment(this.paymentOrderId).subscribe((response)=> {
        console.log(response.paymentOrder.status);
        if(response.paymentOrder.status == "Paid"){
          this.totalSumma = this.totalSumma + 40;
          clearInterval(this.interval);
        }
      })
   }, 3000);
  }

 
}
