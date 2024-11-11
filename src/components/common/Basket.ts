import { IOrderBasket } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement, createElement } from '../../utils/utils';

export class Basket extends Component<IOrderBasket> {
	totalamount: HTMLElement;
	productListItem: HTMLElement;
	button: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);
		this.productListItem = ensureElement<HTMLElement>(
			'.basket__list',
			this.container
		);
		this.totalamount = this.container.querySelector('.basket__price');
		this.button = this.container.querySelector('.basket__button');

		if (this.button) {
			this.button.addEventListener('click', () => {
				events.emit('order:open');
			});
		}

		this.list = [];
	}
    set list(items: HTMLElement[]) {
		if (items.length) {
			this.productListItem.replaceChildren(...items);
			this.button.removeAttribute('disabled');
		} else {
			this.productListItem.replaceChildren(
				createElement<HTMLElement>('p', { textContent: 'Корзина пуста' })
			);
			this.button.setAttribute('disabled', 'disabled');
		}
	}

	set total(value: number) {
		this.setText(this.totalamount, `${value} синапсов`);
	}
}

