// import { CardPreview } from './Cards';
//  import { CategoryType } from './../../types/index';
import { Component } from './base/Component';
import { IProduct, CategoryType } from '../types';
import { ensureElement } from '../utils/utils';
import { categoryList, CDN_URL } from '../utils/constants';

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
    
}
// interface ICard {
//  title: string;
//  category: string;
//  image: string;
//  price: number;
//  text: string;
// }


export class Card extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _button?: HTMLButtonElement;
    // protected _index?: HTMLElement;
    

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>('.card__title', this.container);
        this._price = ensureElement<HTMLElement>('.card__price', this.container);
        this._button = container.querySelector('.card__button');
        // this._index = container.querySelector('.basket__item-index')

    
        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }

    set button(value: string) {
        if (this._button) {
            this._button.textContent = value;
        }
    }
    set id(value: string) {
        this.container.dataset.id = value;
    }

    set price(value: string) {
        if(value === null) {
            this.setText(this._price, `Бесценно`);
          } else {
            this.setText(this._price, `${value} синапсов`);
          }
        }
        // set index(value: number) {
        //     this.setText(this._index, value);
        // }
       
    set title(value: string) {
        this.setText(this._title, value);
    }

   
}

//данный класс отвечает за отображение карточки на странице
export class OnlyCardOnPage extends Card {
    _image: HTMLImageElement;
    _category: HTMLElement;
    // _description: HTMLElement;
    
    
    constructor(container: HTMLElement,  actions?: ICardActions) {
        super(container, actions);

        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);
        // this._description = ensureElement<HTMLElement>('.card__text', container);
       
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title);
    }
    
    set category(value: CategoryType) {
        this.setText(this._category, value);
        this.toggleClass(this._category, categoryList[value], true);
    }
    // set description(value: string) {
    //     this.setText(this._description, value);
    // }
}

//класс который отвечает за предпросмтр карточки с детальным ее описанием
export class CardPreview extends OnlyCardOnPage {
    _description: HTMLElement;
   

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);

        this._description = ensureElement<HTMLElement>('.card__text', container);
    }

    set description(value: string) {
        this.setText(this._description, value);
    }

}

export class CardWithIndex extends Card {
    private _index: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container, actions);
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
    }

    set index(value: number) {
        this.setText(this._index, value.toString());
    }
}