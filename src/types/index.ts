export type TProductId = string;

export interface IProduct {
  id: TProductId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;  
  inBasket?: boolean;
}

export interface IProductList  {
  total: number;
  items: IProduct[];
}

export type TPaymentType = 'card' | 'cash'

export interface IClient {
  email: string;
  phone: string;
  address: string;
}

export interface IOrderForm extends IClient {
  payment: string;
  total: number; 
}

export interface IOrder extends IOrderForm {
  items: TProductId[];
}

export interface IOrderSuccess {
  id: string;
  total: number;
}

export type TOrderInfo = Pick<IOrderForm, 'payment' | 'address'>

export type TOrderContact = Pick<IOrderForm, 'email' | 'phone'>

export type ApiPostMethods = "POST" | "PUT" | "DELETE" | "PATCH"

export interface IApi {
  baseUrl: string;
  get<T>(uri: string): Promise<T>;
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IPreviewEventData {
  product: IProduct;
}

export interface IPageLocked {
  locked: boolean;
}