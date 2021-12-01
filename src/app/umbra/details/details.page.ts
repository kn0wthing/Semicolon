import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { CovidService } from 'src/app/services/covid.service';
import { Products } from 'src/app/models/products.model';

declare var H: any;
@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
})

/*
resource: selected resource(mall) details from Home page
platform: to store api key for map
lat: latitude of resource
long: logitude of resource
productList: List of other products available at selected mall
hideLocation: flag to show hide map
cart: array of all ordered items
cartCount: no of items in cart
cartMap: To find unique products in cart in case more than one item of same type is selected
isLoading: To show waiting loader while fetching data from API
*/

export class DetailsPage implements OnInit, OnDestroy {
  public resource: Products;
  private platform: any;
  public mapElement: ElementRef;
  private lat: any;
  private long: any;
  public productList: Products[] = [];
  public hideLocation: boolean = true;
  public cart: any[] = [];
  public cartCount: number = 0;
  public cartMap: Map<string, number> = new Map();
  public isLoading: boolean = false;
  public markerArray: any[] = [];
  public inContainmentZone: boolean = false;
  public map: any;

  constructor(
    private productsService: ProductsService,
    private covidService: CovidService
  ) {
    this.cartCount = this.cart.length;
  }

  ngOnInit() {
    this.resource = this.productsService.getResource();
    this.lat = this.resource.latitue;
    this.long = this.resource.longitue;

    // To fetch other products available at this place
    this.productsService.getProductList(this.resource.mallid, this.resource.category).toPromise().then((products) => {
      for (let key in products) {
        if (this.resource["item"] != products[key]["item"]) {
          this.productList.push(products[key]);
        }
      }

      // To get covid zones nearby mall
      this.covidService.getNearbyZones(this.lat, this.long).toPromise().then(res => {
        let result: any = res;
        for (let key of result.containmentZones) {
          if (key.latlngFound === true) {
            this.markerArray.push({ lat: key.lat, lng: key.long });
          }
        }

        if (result.numberOfNearbyZones === 0) {
          this.inContainmentZone = false
        } else {
          this.inContainmentZone = true
        }
        this.addInfoMap(this.map);
      });
    });

    this.map = this.loadMap();
  }

  // to show containment or green zone
  public addInfoMap(map): void {

    let fillcolor: string;
    let strokecolor: string;

    if (this.inContainmentZone == true) {
      fillcolor = "rgba(255,0,0,0.2)";
      strokecolor = "rgba(255,0,0,0.2)";
    } else {
      fillcolor = "rgba(0,255,0,0.2)";
      strokecolor = "rgba(0,255,0,0.2)";
    }

    var icon = new H.map.Icon("assets/mall_marker.png", { size: { w: 35, h: 36 } });

    map.addObject(new H.map.Marker({ lat: this.lat, lng: this.long }, { icon: icon }));

    for (let i = 0; i < this.markerArray.length; i++) {
      icon = new H.map.Icon("assets/marker.png", { size: { w: 37, h: 37 } });
      map.addObject(new H.map.Marker(this.markerArray[i], { icon: icon }));
    }

    map.addObject(
      new H.map.Circle(
        // The central point of the circle
        { lat: this.lat, lng: this.long },
        // The radius of the circle in meters
        1000,
        {
          style: {
            strokeColor: strokecolor, // Color of the perimeter
            lineWidth: 2,
            fillColor: fillcolor, // Color of the circle
          },
        }
      )
    );
  }

  public loadMap(): void {

    this.platform = new H.service.Platform({
      apikey: "yRcz-0_gRnl3AKUShWXf6HSY9wObwmppHWxqr4xOj8k",
    });

    var defaultLayers = this.platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.raster.normal.map,
      {
        zoom: 14,
        center: { lat: this.lat, lng: this.long },
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    window.addEventListener("resize", () => map.getViewPort().resize());
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    return map;
  }

  // To show or hide map
  public hideAndUnhideLocation(): void {
    if (this.hideLocation === true) {
      this.hideLocation = false;
    } else {
      this.hideLocation = true;
    }
  }

  // To add selected item in cart
  public addToCart(product, change): void {
    if (change == "add") {
      if (this.cartMap.has(product)) {
        this.cartMap.set(product, this.cartMap.get(product) + 1);
      } else {
        this.cartMap.set(product, 1);
      }
      product.quantity -= 1;
      this.cart.push(product);
    } else if (change == "remove") {
      let removeCount = 0;
      this.cartMap.set(product, this.cartMap.get(product) - 1);
      this.cart.map((item, index) => {
        if (product._id == item._id && removeCount == 0) {
          this.cart.splice(index, 1);
          removeCount++;
        }
      });
      product.quantity += 1;
    }
    product.selectedQuantity = this.cartMap.get(product);
    this.cartCount = this.cart.length;
    this.productsService.setCartCount(this.cartCount);
  }

  ngOnDestroy() {
    this.productsService.setCartItems(this.cart);
    this.productsService.setCartMap(this.cartMap);
  }
}
