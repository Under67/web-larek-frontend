import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Success  {
  protected totalElement: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    this.container = container;
    this.totalElement = ensureElement('.order-success__description', this.container);
    this.button = ensureElement('.order-success__close', this.container) as HTMLButtonElement;
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      events.emit('order:success');
    
    });
  }
  setTotalPrice(total: number): void {
    this.totalElement.textContent = `Списано ${total.toString()} синапсов`;
  }
  get element() {
    return this.container;
  }
}