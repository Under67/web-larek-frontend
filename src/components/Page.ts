import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";
import { IEvents } from "./base/events";

interface ICardsContainer {
  catalog: HTMLElement[];
}

export class Page extends Component<ICardsContainer> {
  protected basketButton: HTMLButtonElement;
  protected counter: HTMLElement;
  protected pageWrapperElement: HTMLElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events)
    this.pageWrapperElement = ensureElement<HTMLElement>('.page__wrapper');
    this.basketButton = document.querySelector('.header__basket') as HTMLButtonElement;
    this.counter = document.querySelector('.header__basket-counter') as HTMLElement;

    this.basketButton.addEventListener('click', (e) => { 
      e.preventDefault();
    this.events.emit("catalog:basket");
    })
  }

  setCount(count: number): void {
    this.counter.textContent = count.toString();
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items)
  }
  set locked(value: boolean) {
    if (value) {
        this.pageWrapperElement.classList.add('page__wrapper_locked');
    } else {
        this.pageWrapperElement.classList.remove('page__wrapper_locked');
    }
  }
}