import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class Success<IOrderSuccess> extends Component<IOrderSuccess> {
  protected form: HTMLElement;
  protected totalElement: HTMLElement;
  protected button: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.form = this.container;
    this.totalElement = this.form.querySelector('.order-success__description');
    this.button = this.form.querySelector('.order-success__close');

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      events.emit('order:success');
    });
  }
  setTotalPrice(total: number) {
    this.totalElement.textContent = total.toString();
  }
}