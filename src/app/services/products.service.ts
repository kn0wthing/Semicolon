import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Products } from '../models/products.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private apiURL: string = "https://covid-cfc.eu-gb.mybluemix.net/api";

  private resource: Products;
  private cartItems: any[] = [];
  private mallID: string;
  private mallName: string;
  public cartMap: Map<string, number>;
  public cartCount: number;

  constructor(private http: HttpClient) {}

  public getToken(): Observable<any> {
    return this.http.get(`${this.apiURL}/assisstant/session`);
  }

  public getChatResponse(sessionid, text): Observable<any> {
    let data = {
      sessionid: sessionid,
      text: text,
    };
    return this.http.post(`${this.apiURL}/assisstant/chat`, data);
  }

  public setResource(resource): void {
    this.resource = resource;
    this.mallID = resource.mallid;
    this.mallName = resource.mallname;
  }

  public getResource(): Products {
    return this.resource;
  }

  public getProductList(mallid, category): Observable<Products> {
    let params = new HttpParams();
    params = params.append("mall_id", mallid);
    params = params.append("category", category);
    return this.http.get<Products>(`${this.apiURL}/products`, { params: params })
  }

  public setCartCount(cartCount): void {
    this.cartCount = cartCount;
  }

  public getCartCount(): number {
    return this.cartCount;
  }

  public setCartItems(cartItems): void {
    this.cartItems = cartItems;
  }

  public getCartItems(): any {
    return this.cartItems;
  }

  public generateQRCode(userid: string, mallid: string): Observable<any> {
    return this.http.post(`${this.apiURL}/products/add-to-cart`, {
      userid,
      mallid,
    });
  }

  public setQRCode(qrURL): void {
    localStorage.setItem("qrCode", qrURL);
  }

  public getQRCode(): string {
    return localStorage.getItem("qrCode");
  }

  public getMallID(): string {
    return this.mallID;
  }

  public setSafeTag(safeTag): void {
    localStorage.setItem("safeTag", safeTag);
  }

  public getSafeTag(): string {
    return localStorage.getItem("safeTag");
  }

  public getMallName(): string {
    return this.mallName;
  }

  public setCartMap(cartMap): void {
    this.cartMap = cartMap;
  }

  public getCartMap(): any {
    return this.cartMap;
  }
  
}
