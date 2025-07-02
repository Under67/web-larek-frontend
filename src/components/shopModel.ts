import { IOrder, IProduct, TProductId } from "../types";
import { IEvents } from "../components/base/events";

export class ShopModel {
  protected _catalog: IProduct[];
  protected _basket: IProduct[];
  protected _preview: IProduct | null;
  protected _order: object;
  protected events: IEvents;
  constructor(events: IEvents) {
    this.events = events;
    this._catalog = [];
    this._basket = [];
    this._preview = null;
    this._order = {};
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
  }

  removeBasket(product: IProduct): void {
    this._basket = this._basket.filter((item) => item.id !== product.id);
  }

  clearBasket():void {
    this._basket = []
    this.events.emit('catalog:loaded')
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

  getPreview(): IProduct | null {
    return this._preview;
  }
  isInBasket(id: string): boolean {
    return this.basket.some(item => item.id === id);
  }
  get order() {
    return this._order
  }
  set order(data: Partial<IOrder>) {
    Object.assign(this.order as object, data ?? {});
  }
}

