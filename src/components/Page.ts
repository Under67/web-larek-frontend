import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

interface ICardsContainer {
  catalog: HTMLElement[];
}

export class Page extends Component<ICardsContainer> {
  protected _catalog: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected counter: HTMLElement;
  protected pageWrapperElement: HTMLElement;
  constructor(protected container: HTMLElement) {
    super(container)
    this.pageWrapperElement = ensureElement<HTMLElement>('.page__wrapper');
    this.basketButton = document.querySelector('.header__basket') as HTMLButtonElement;
    this.counter = document.querySelector('.header__basket-counter') as HTMLElement;

    this.basketButton.addEventListener('click', (e) => { 
      e.preventDefault();
      console.log(123)
    })
  }

  setCount(count: number) {
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