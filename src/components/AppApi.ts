import { IApi, IProduct, TProductId, IOrder, IProductList, IOrderSuccess } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getProductList(): Promise<IProductList> {
		return this._baseApi.get<IProductList>(`/product`).then((product: IProductList) => product);
	}

	getProduct(id: TProductId): Promise<IProduct> {
		return this._baseApi.get<IProduct>(`/cards/${id}`).then((product: IProduct) => product);
	}

	sendOrder(Form: IOrder): Promise<IOrderSuccess> {
		return this._baseApi.post<IOrderSuccess>(`/order`, Form).then(
			(res: IOrderSuccess) => res
		);
	}
}
