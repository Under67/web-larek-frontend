  import { IProduct } from "../types";
  import { CDN_URL, ECategory } from "../utils/constants";
  import { ensureElement } from "../utils/utils";
  import { Component } from "./base/Component";
  import { IEvents } from "./base/events";

abstract class Merchandise<T> extends Component<T> {
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.cardTitle = ensureElement(".card__title", this.container);
    this.cardPrice = ensureElement(".card__price", this.container);
  }
   set _id (id: string) {
      this._id = id;
    }

    set title(title: string) {
      if(this.cardTitle) {
      this.cardTitle.textContent = title
    }
  }
    set price(price: number | string) {
      this.cardPrice.textContent = `${price} синапсов`;
      if(!price) {
        this.cardPrice.textContent = 'Бесценно';
      }
    }
}

  export class Card extends Merchandise<IProduct> {
    protected cardImg: HTMLImageElement;
    protected cardCategory: HTMLElement;
    constructor(protected container: HTMLElement, events: IEvents) {
      super(container, events);
      this.cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;
      this.cardCategory = ensureElement('.card__category', this.container);
        this.container.addEventListener('click', (e) => {
          e.preventDefault()
          this.events.emit("catalog:preview", { product: this._data});
        });
  }
    set category (category: string) {
      if(this.cardCategory) {
        this.cardCategory.textContent = category;
        Object.values(ECategory).forEach(suffix =>
        this.cardCategory.classList.remove(`card__category${suffix}`)
        );
      if (category in ECategory) {
        const suffix = ECategory[category as keyof typeof ECategory];
        this.cardCategory.classList.add(`card__category${suffix}`);
      }
    }
  }
    set image(src: string) {
      if(this.cardImg){
      this.cardImg.src = `${CDN_URL}${src}`;
    }
  }
}
export class CardPreview extends Merchandise<IProduct> {
  protected cardImg: HTMLImageElement;
  protected cardCategory: HTMLElement;
  protected cardDescription: HTMLElement;
  protected basketAddButton: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container, events);
    this.cardImg = ensureElement('.card__image', this.container) as HTMLImageElement;
    this.cardCategory = ensureElement('.card__category', this.container);
    this.cardDescription = ensureElement('.card__text', this.container);
    this.basketAddButton = ensureElement('.card__button', this.container) as HTMLButtonElement;
  }
  set image(src: string) {
      if(this.cardImg){
      this.cardImg.src = `${CDN_URL}${src}`;
    }
  }
    set description(description: string) {
      if (this.cardDescription) {
      this.cardDescription.textContent = description;
    }
  }
    set category (category: string) {
      if(this.cardCategory) {
        this.cardCategory.textContent = category;
        Object.values(ECategory).forEach(suffix =>
        this.cardCategory.classList.remove(`card__category${suffix}`)
        );
      if (category in ECategory) {
        const suffix = ECategory[category as keyof typeof ECategory];
        this.cardCategory.classList.add(`card__category${suffix}`);
      }
    }
  }
  updateBasketButton(data: Partial<IProduct>): void {
  if (!this.basketAddButton) return;

  const newButton = this.basketAddButton.cloneNode(true) as HTMLButtonElement;
  this.basketAddButton.replaceWith(newButton);
  this.basketAddButton = newButton;

  this._data = data;

  const isPriceValid =
    typeof data.price === 'number' && data.price > 0;

  this.basketAddButton.disabled = !isPriceValid;

  this.basketAddButton.textContent = !isPriceValid
    ? 'Недоступно'
    : data.inBasket
      ? 'Удалить из корзины'
      : 'В корзину';

  if (isPriceValid) {
    this.basketAddButton.addEventListener('click', (e) => {
      e.preventDefault();

      if (this._data.inBasket) {
        this.events.emit('basket:remove', { product: this._data });
      } else {
        this.events.emit('basket:add', { product: this._data });
      }

      this.events.emit('basket:changed', { product: this._data });
    });
  }
}
}


export class CardBasket extends Merchandise<IProduct> {
  protected basketIndex: HTMLElement;
  protected basketDeleteButton: HTMLButtonElement;
  constructor(protected container: HTMLElement, events: IEvents) {
    super(container,events)
    this.events = events;
    this.basketIndex = ensureElement('.basket__item-index', this.container);
    this.basketDeleteButton = ensureElement('.basket__item-delete', this.container) as HTMLButtonElement;
    this.basketDeleteButton.addEventListener('click', (e) => {
          e.preventDefault()
          this.events.emit("basket:remove", { product: this._data});
    });
  }
   set index(i: number) {
    if (this.basketIndex) {
      this.basketIndex.textContent = `${i}  `;
    }
  }
}
