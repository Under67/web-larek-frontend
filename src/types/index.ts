type TProductId = string;

export interface IProduct {
  id: TProductId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;  
}

export interface IProductList  {
  total: number;
  items: IProduct[];
}

export interface ShopModel {
  catalog: IProduct[];
  basket: IProduct[];
  preview: IProduct | null;
  order: IOrder | null;
}

type TPaymentType = 'online' | 'offline'

export interface IClient {
  email: string;
  phone: string;
  address: string;
}

export interface IOrderForm extends IClient {
  payment: TPaymentType;
  total: number;
}

export interface IOrder extends IOrderForm {
  items: TProductId[];
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

export type TProductInfo = Omit<IProduct, 'id'>

export type TBasketInfo = {
  index: number;         
  title: string;         
  price: number | null;   
}

export type TOrderInfo = Pick<IOrderForm, 'payment' | 'address'>

export type TOrderContact = Pick<IOrderForm, 'email' | 'phone'>