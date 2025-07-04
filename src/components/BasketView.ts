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
        events.emit('order:submit')
        }
      })
    }
  setProduct(items: HTMLElement[]): void {
    this._product = items;
    this.itemsContainer.replaceChildren(...items);
  }

  updateTotalPrice(price: number): void {
    this.total = price;
    this.totalPrice.textContent = `${price} синапсов`;
  }
   get product(): HTMLElement[] {
      return this._product;
    }
    get element(): HTMLElement {
    return this.container;
  }
  setSubmitDisabled(state: boolean): void {
  this.button.disabled = state;
  }
  }