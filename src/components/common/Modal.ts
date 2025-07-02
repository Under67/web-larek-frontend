  import { IPageLocked } from "../../types";
import { ensureElement } from "../../utils/utils";
  import { Component } from "../base/Component";
  import { IEvents } from "../base/events";


  export class Modal<T> extends Component<T> {
    protected modal: HTMLElement;
    protected closeButton: HTMLButtonElement;
    protected page?: IPageLocked;
    constructor(protected container: HTMLElement, events: IEvents, page?: IPageLocked) {
      super(container, events);
      this.page = page;
      this.modal = ensureElement('.modal__content', this.container);
      this.closeButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
      
      this.closeButton.addEventListener('click', () => {
        this.close();
      });

      this.container.addEventListener('click', (evt: MouseEvent) => {
        if (evt.target === this.container) {
          this.close();
        }
      });
      this.handleEscPress = this.handleEscPress.bind(this);
    }

    handleEscPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    };
    open() {
      this.container.classList.add("modal_active"); 
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', this.handleEscPress);
      this.events.emit("modal:open");
      if (this.page) {
        this.page.locked = true;
}
    }
    close() {
      this.container.classList.remove("modal_active");
      document.body.style.overflow = '';
      document.removeEventListener('keydown', this.handleEscPress);
      this.modal.replaceChildren();
      this.events.emit("modal:close");
      if (this.page) {
       this.page.locked = false;
}
    }

    setContent(content: HTMLElement) {
      this.modal.replaceChildren(content);
  }
  }