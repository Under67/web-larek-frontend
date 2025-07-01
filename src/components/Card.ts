  import { IProduct } from "../types";
  import { CDN_URL, ECategory } from "../utils/constants";
  import { ensureElement } from "../utils/utils";
  import { Component } from "./base/Component";
  import { IEvents } from "./base/events";

  export class Card extends Component<IProduct> {
    protected events: IEvents;
    protected _data: Partial<IProduct>;
    protected previewButton: HTMLButtonElement | null;
    protected cardImg: HTMLImageElement | null;
    protected cardCategory: HTMLElement | null;
    protected titleElement: HTMLElement;
    protected descriptionElement: HTMLElement | null;
    protected basketAddButton: HTMLButtonElement | null;
    protected cardPrice: HTMLElement;
    protected basketIndex: HTMLElement | null;
    protected basketDeleteButton: HTMLButtonElement | null;


    constructor(protected container: HTMLElement, events: IEvents) {
      super(container)
      this.events = events;

      this.previewButton = this.container.matches('button.gallery__item')
        ? this.container as HTMLButtonElement
        : null;
      this.cardImg = this.container.querySelector('.card__image');
      this.cardCategory = this.container.querySelector('.card__category');
      this.titleElement = ensureElement('.card__title', this.container);
      this.descriptionElement = this.container.querySelector('.card__text');
      this.basketAddButton = this.container.querySelector('.card__button');
      this.cardPrice = ensureElement('.card__price', this.container);
      this.basketIndex = this.container.querySelector('.basket__item-index');
      this.basketDeleteButton = this.container.querySelector('.basket__item-delete');

      if (this.previewButton) {
        this.previewButton.addEventListener('click', (e) => {
          e.preventDefault()
          this.updateBasketButton()
          this.events.emit("catalog:preview", { product: this._data});
        });
      }

      if (this.basketDeleteButton) {
        this.basketDeleteButton.addEventListener('click', (e) => {
          e.preventDefault()
          this.events.emit("basket:remove", { id: this._id });
        });
      }
    }

    set _id (id: string) {
      this._id = id;
    }

    set title(title: string) {
      if(this.titleElement) {
      this.titleElement.textContent = title
    }
  }

    set price(price: number | string) {
      this.cardPrice.textContent = `${price} синапсов`;
      if(!price) {
        this.cardPrice.textContent = 'Бесценно';
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

    set image(src: string) {
      if(this.cardImg){
      this.cardImg.src = `${CDN_URL}${src}`;
    }
    }

    set description(description: string) {
      if (this.descriptionElement) {
      this.descriptionElement.textContent = description;
    }
  }
    set index(i: number) {
    if (this.basketIndex) {
      this.basketIndex.textContent = `${i}  `;
    }
    }
    updateBasketButton(data?: Partial<IProduct>, inBasket?: boolean) {
    if (!this.basketAddButton) return;

    if (inBasket) {
      this.basketAddButton.textContent = 'Удалить из корзины';
      this.basketAddButton.onclick = (e) => {
        e.preventDefault();
        this.events.emit('basket:remove', { product: data});
      };
    } else {
      this.basketAddButton.textContent = 'В корзину';
      this.basketAddButton.onclick = (e) => {
        e.preventDefault();
        this.events.emit('basket:add', { product: data });
      };
    }
  }
  }
