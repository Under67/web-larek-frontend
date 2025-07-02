import { IEvents } from "./base/events";
import { TOrderContact, TOrderInfo, TPaymentType } from '../types/index'

export class OrderForm {
  protected onlinePaymentButton: HTMLButtonElement;
  protected offlinePaymentButton: HTMLButtonElement;
  protected addressInput: HTMLInputElement;
  protected button: HTMLButtonElement;
  protected payment: TPaymentType;
  constructor(protected container: HTMLElement, events: IEvents) {
    this.container = container;
    this.onlinePaymentButton = this.container.querySelector('button[name="card"]');
    this.offlinePaymentButton = this.container.querySelector('button[name="cash"]');
    this.addressInput = this.container.querySelector('input[name="address"]');
    this.button = this.container.querySelector('.order__button');
    this.onlinePaymentButton.addEventListener('click', () => this.selectPayment('card'));
    this.offlinePaymentButton.addEventListener('click', () => this.selectPayment('cash'));
    this.validateForm();
    
    this.container.addEventListener('submit', (e) => {
      e.preventDefault()
      events.emit('order:address', this.getData());
    })

    this.addressInput.addEventListener('input', () => {
    this.button.disabled = !(this.addressInput.value.trim() && this.payment);
});
  }
  selectPayment(method: 'card' | 'cash'):void {
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
  getData(): TOrderInfo {
    return {
    payment: this.payment,
    address: this.addressInput.value.trim()
  }
  }
  get element() {
    return this.container;
  }
}

export class ContactForm {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected button: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    this.container = container;
    this.emailInput = this.container.querySelector('input[name="email"]');
    this.phoneInput = this.container.querySelector('input[name="phone"]');
    this.button = this.container.querySelector('.button[type="submit"]');
    this.validateForm();
    this.emailInput.addEventListener('input', () => this.validateForm());
    this.phoneInput.addEventListener('input', () => this.validateForm());
    this.container.addEventListener('submit', (e) => {
      e.preventDefault();
      events.emit('order:contact', this.getData());
    });
  }

  isFormValid(): boolean {
    return this.emailInput.value.trim() !== '' && this.phoneInput.value.trim() !== '';
  }

  validateForm(): void {
    this.button.disabled = !this.isFormValid();
  }

  getData(): TOrderContact {
    return {
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim()
    };
  }
  get element() {
    return this.container;
  }
}