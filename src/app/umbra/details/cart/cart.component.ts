import { Component, OnInit } from "@angular/core";
import { ProductsService } from "src/app/services/products.service";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/users.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})

/*
cartItems: array of all ordered items
cartCount: no of items in cart
cartMap: To find unique products in cart in case more than one item of same type is selected
qrURL,safeTag: To store qrURL and safeTag response from API
grandTotal: to display total of all cart items
*/
export class CartComponent implements OnInit {
  public cartItems: any[] = [];
  public cartCount: number = 0;
  public qrURL: string;
  public safeTag: any;
  public cartMap: Map<string, number>;
  public grandTotal: number = 0;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // to get cart items from service
    this.cartItems = this.productService.getCartItems();
    this.cartCount = this.cartItems.length;
    if (this.cartCount > 0) {
      this.cartMap = this.productService.getCartMap();
      this.cartItems = [];
      for (let key of this.cartMap.keys()) {
        this.cartItems.push(key);
        this.grandTotal =
          this.grandTotal +
          JSON.parse(JSON.stringify(key)).price * this.cartMap.get(key);
      }
    }
  }

  // To generate QR code for logged in user
  public generateQRCode(): void {
    let response;
    const userid = this.userService.getUserId();
    const mallid = this.productService.getMallID();
    this.productService.generateQRCode(userid, mallid).subscribe((res) => {
      response = res;
      this.qrURL = response.qrCode;
      this.safeTag = response.safetag;
      this.productService.setSafeTag(this.safeTag);
      this.productService.setQRCode(this.qrURL);
      this.router.navigate(["/umbra/qr"]);
      // to reset cart once order placed and qr code generated
      this.productService.setCartItems([]);
      this.productService.setCartCount(0);
      this.productService.setCartMap(null);
    });
  }

}
