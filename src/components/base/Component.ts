import { IProduct } from "../../types";

export abstract class Component<T> {
    protected _data: Partial<IProduct>;
    constructor(protected readonly container: HTMLElement) {

    }

    render(data?: Partial<T>): HTMLElement {
        this._data = data;
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}