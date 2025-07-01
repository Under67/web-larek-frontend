import { Component } from "./base/Component";
import { IEvents } from "./base/events";

export class ContactForm<TOrderContact> extends Component<TOrderContact> {
  protected form: HTMLElement;
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;
  protected button: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container);
    this.form = this.container;
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.phoneInput = this.form.querySelector('input[name="phone"]');
    this.button = this.form.querySelector('.button[type="submit"]');

    this.validateForm();

    this.emailInput.addEventListener('input', () => this.validateForm());
    this.phoneInput.addEventListener('input', () => this.validateForm());

    this.form.addEventListener('submit', (e) => {
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

  getData() {
    return {
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim()
    };
  }
}