import { IProduct } from "../types";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class BasketView<T> extends Component<T> {
    protected _product: HTMLElement[];
    protected items: IProduct[];
    protected itemsContainer: HTMLElement;
    protected totalPrice: HTMLElement;
    protected total: number;
    protected button: HTMLButtonElement;
    constructor(protected container: HTMLElement, events: IEvents) {
      super(container, events);
      this.itemsContainer = this.container.querySelector('.basket__list');
      this.totalPrice = this.container.querySelector('.basket__price');
      this.button = this.container.querySelector('.basket__button'); 
      this.button.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.total > 0) {
        const ids = this.items
    .filter(item => item.price != null && item.price > 0)
    .map(item => item.id);
        events.emit('order:submit', { items: ids, total: this.total})
        }
      })
    }
    setProduct(items: HTMLElement[], products: IProduct[]): void {
      this._product = items;
      this.items = products;
      this.itemsContainer.replaceChildren(...items)
      this.total = this.items.reduce((sum, item) => sum + item.price, 0);
      this.updateTotalPrice(this.total);
      this.button.disabled = this.total <= 0;
    }

    updateTotalPrice(price: number): void {
      this.totalPrice.textContent = `${price} синапсов`;
}
   get product(): HTMLElement[] {
      return this._product;
    }
    get element(): HTMLElement {
    return this.container;
  }
  }