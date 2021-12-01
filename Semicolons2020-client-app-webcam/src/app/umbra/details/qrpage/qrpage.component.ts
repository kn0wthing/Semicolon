import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-qrpage",
  templateUrl: "./qrpage.component.html",
  styleUrls: ["./qrpage.component.scss"],
  providers:[DatePipe]
})

/*
date,time : date and time on qr code
mallName: name of mall for which safeTag is generated.
*/

export class QrpageComponent implements OnInit {
  public qrURL: any;
  public date: string;
  public time: string;
  public safeTag: string;
  public mallName: string;

  constructor(private productService: ProductsService, private datePipe: DatePipe) {}

  ngOnInit() {
    let date:string = this.datePipe.transform(new Date(), 'EEE, MMM d, y');
    let time:string = this.datePipe.transform(new Date(), 'hh : mm : ss aaa')
    this.date = date;
    this.time = time;
    this.mallName = this.productService.getMallName();
    this.safeTag = this.productService.getSafeTag();
    this.qrURL = this.productService.getQRCode();
  }
}
