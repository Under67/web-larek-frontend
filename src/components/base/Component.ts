import { IProduct } from "../../types";
import { IEvents } from "./events";

export abstract class Component<T> {
    protected _data: Partial<IProduct>;
    constructor(protected readonly container: HTMLElement, protected events: IEvents) {

    }

    render(data?: Partial<T>): HTMLElement {
        this._data = data;
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}