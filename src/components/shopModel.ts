import { IBasket, IOrder, IProduct, TProductId, IProductList } from "../types";
import { IEvents } from "../components/base/events";

export class ShopModel {
  protected _catalog: IProduct[];
  protected _basket: IProduct[];
  protected _preview: IProduct | null;
  protected _order: IOrder | null;
  protected events: IEvents;
  constructor(events: IEvents) {
    this.events = events;
    this._catalog = [];
    this._basket = [];
    this._preview = null;
    this._order = null;
  }

  set catalog(data: IProduct[]) {
    this._catalog = data;
  }
  get catalog(): IProduct[] {
    return this._catalog
  }
  
  get basket(): IProduct[] {
    return this._basket
  }

  getProduct(id: TProductId): IProduct {
    return this._catalog.find(item => item.id === id);
  }

  addBasket(product: IProduct): void {
    this.basket.push(product)
  this.events.emit('basket:changed');
  }

  removeBasket(id: TProductId): void {
    this.events.emit('basket:changed'); 
    this._basket = this._basket.filter((item) => item.id !== id);
  }

  clearBasket():void {
    this._basket = []
    this.events.emit('basket:changed');
  }

  getBasketLength(): number {
    return this._basket.length
  }

  getBasketTotalPrice(): number {
    return this._basket.reduce((total, item) => total + item.price, 0);
  }

  setPreview(product: IProduct) {
    this._preview = product;
  }

  getPreview() {
    return this._preview;
  }
  isInBasket(id: string): boolean {
    return this.basket.some(item => item.id === id);
  }

}