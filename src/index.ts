  import { AppApi } from './components/AppApi';
  import { BasketView } from './components/BasketView';
  import { Card } from './components/Card';
  import { ContactForm } from './components/ContactForm';
  import { OrderForm } from './components/OrderForm';
  import { Page } from './components/Page';
  import { Success } from './components/Success';
  import { Api } from './components/base/api';
  import { EventEmitter } from './components/base/events';
  import { Modal } from './components/common/Modal';
  import { ShopModel } from './components/shopModel';
  import './scss/styles.scss';
  import { IApi, IPreviewEventData } from './types';
  import { API_URL } from './utils/constants';
  import { cloneTemplate } from './utils/utils';

  const events = new EventEmitter();

  const shopModel = new ShopModel(events)

  const baseApi: IApi = new Api(API_URL)
  const api = new AppApi(baseApi);


  const cardGallery = document.querySelector(".gallery") as HTMLElement
  const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
  const basketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
  const previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement
  const modalContainer = document.querySelector('.modal') as HTMLElement;
  
  const cards = new Page(cardGallery)
  const modal = new Modal(modalContainer, events);
  events.onAll((event) => {
    console.log(event.eventName, event.data)
  })

  api.getProductList()
      .then(data => {
          shopModel.catalog = data.items
          events.emit('catalog:loaded');

      })
      .catch(err => console.log(err))

  events.on('catalog:loaded', () => {
  const updatedCatalog = shopModel.catalog.map(product => ({
    ...product,
    inBasket: shopModel.isInBasket(product.id)  // true или false
  }));
  shopModel.catalog = updatedCatalog;
  const array = updatedCatalog.map(product => {
    const cardInstance = new Card(cloneTemplate(cardTemplate), events);
    return cardInstance.render(product);
  });

  cards.render({ catalog: array });
  cards.setCount(shopModel.getBasketLength());
});

  events.on('catalog:preview', (data: IPreviewEventData) => {
  const {product} = data
  const cardPreview = new Card(cloneTemplate(previewTemplate), events);
  modal.setContent(cardPreview.render(product));
  modal.open();
    events.on('basket:add', (data: IPreviewEventData) => {
      const {product} = data
      shopModel.addBasket(product)
      cards.setCount(shopModel.getBasketLength())
      cardPreview.updateBasketButton(product, product.inBasket)
});
})

