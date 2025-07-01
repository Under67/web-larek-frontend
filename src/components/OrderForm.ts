import { Component } from "./base/Component";
import { IEvents } from "./base/events";
import { TOrderInfo, TPaymentType } from '../types/index'

export class OrderForm<TOrderInfo> extends Component<TOrderInfo> {
  protected form: HTMLElement;
  protected onlinePaymentButton: HTMLButtonElement;
  protected offlinePaymentButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected button: HTMLButtonElement;
  protected payment: TPaymentType;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.form = this.container;
    this.onlinePaymentButton = this.form.querySelector('button[name="card"]');
    this.offlinePaymentButton = this.form.querySelector('button[name="cash"]');
    this.addressInput = this.form.querySelector('input[name="address"]');
    this.button = this.form.querySelector('.order__button');
    this.onlinePaymentButton.addEventListener('click', () => this.selectPayment('card'));
    this.offlinePaymentButton.addEventListener('click', () => this.selectPayment('cash'));
    this.validateForm();
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      events.emit('order:address', this.getData());
    })

    this.addressInput.addEventListener('input', () => {
    this.button.disabled = !(this.addressInput.value.trim() && this.payment);
});
  }
  selectPayment(method: 'card' | 'cash') {
    if (method === 'card') {
      this.onlinePaymentButton.classList.add('button_alt-active');
      this.offlinePaymentButton.classList.remove('button_alt-active');
    } else {
      this.offlinePaymentButton.classList.add('button_alt-active');
      this.onlinePaymentButton.classList.remove('button_alt-active');
    }
    this.payment = method;
    this.validateForm()
  }

  isFormValid(): boolean {
    return this.addressInput.value.trim() !== '' && !!this.payment;
  }

  validateForm(): void {
    this.button.disabled = !this.isFormValid();
  }
  getData() {
    return {
    payment: this.payment,
    address: this.addressInput.value.trim()
  }
  }
}