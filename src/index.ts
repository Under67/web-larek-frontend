  import { AppApi } from './components/AppApi';
  import { BasketView } from './components/BasketView';
  import { Card, CardBasket, CardPreview } from './components/Card';
  import { OrderForm, ContactForm } from './components/Form';
  import { Page } from './components/Page';
  import { Success } from './components/Success';
  import { Api } from './components/base/api';
  import { EventEmitter } from './components/base/events';
  import { Modal } from './components/common/Modal';
  import { ShopModel } from './components/shopModel';
  import './scss/styles.scss';
  import { IApi, IClient, IOrder, IOrderForm, IPreviewEventData } from './types';
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
  const basketContainer = document.querySelector('#basket') as HTMLTemplateElement;
  const orderForm = document.querySelector('#order') as HTMLTemplateElement;
  const contactForm = document.querySelector('#contacts') as HTMLTemplateElement;
  const successForm = document.querySelector('#success') as HTMLTemplateElement;
  const cards = new Page(cardGallery, events)
  const modal = new Modal(modalContainer, events, cards);
  api.getProductList()
      .then(data => {
          shopModel.catalog = data.items
          events.emit('catalog:loaded');

      })
      .catch(err => console.log(err))

  events.on('catalog:loaded', () => {
  const updatedCatalog = shopModel.catalog.map(product => ({
    ...product,
    inBasket: shopModel.isInBasket(product.id) 
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
  const updatedProduct = shopModel.getProduct(product.id);
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate), events);
  cardPreview.updateBasketButton(updatedProduct)
  modal.setContent(cardPreview.render(updatedProduct));
  modal.open();
})

events.on('basket:add', (data: IPreviewEventData) => {
      const {product} = data;
      shopModel.addBasket(product);
      cards.setCount(shopModel.getBasketLength());
});

events.on('basket:remove', (data: IPreviewEventData) => {
  const {product} = data;
  shopModel.removeBasket(product);
  cards.setCount(shopModel.getBasketLength());
  const updatedCatalog = shopModel.catalog.map(p => ({
    ...p,
    inBasket: shopModel.isInBasket(p.id)
  }));
  shopModel.catalog = updatedCatalog;
  const updatedProduct = shopModel.getProduct(product.id);
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate), events);
  modal.setContent(cardPreview.render(updatedProduct));
  cardPreview.updateBasketButton(updatedProduct);
  events.emit("catalog:basket");
});

events.on('basket:changed', (data: IPreviewEventData) => {
  const {product} = data
  cards.setCount(shopModel.getBasketLength());
  const updatedCatalog = shopModel.catalog.map(product => ({
    ...product,
    inBasket: shopModel.isInBasket(product.id)
  }));
  shopModel.catalog = updatedCatalog;
  const cardPreview = new CardPreview(cloneTemplate(previewTemplate), events);
  modal.setContent(cardPreview.render(shopModel.getProduct(product.id)));
  cardPreview.updateBasketButton(shopModel.getProduct(product.id))
});

events.on("catalog:basket", () => {
   const basket = new BasketView(cloneTemplate(basketContainer), events);

  const array = shopModel.basket.map((product, i) => {
  const cardInstance = new CardBasket(cloneTemplate(basketTemplate), events);
  cardInstance.index = i + 1; 
  return cardInstance.render(product); 
  });
  basket.setProduct(array, shopModel.basket);
  modal.setContent(basket.element);
  modal.open();
});  

events.on('order:submit', (data) => {
  const order = new OrderForm(cloneTemplate(orderForm),events);
  shopModel.order = data
  modal.setContent(order.element)
}) 

events.on('order:address', (data: IOrderForm) => {
  const contact = new ContactForm(cloneTemplate(contactForm), events);
  shopModel.order = data;
  modal.setContent(contact.element);
})

events.on('order:contact', (data: IClient) => {
  shopModel.order = data; 
  api.sendOrder(shopModel.order as IOrder)
    .then((data) => {
      const success = new Success(cloneTemplate(successForm), events);
      success.setTotalPrice(shopModel.order.total)
      modal.setContent(success.element)
    }) 
    .catch((Error) => {
      console.log(Error)
    })
})

events.on('order:success', () => {
  shopModel.clearBasket()
  modal.close();
})