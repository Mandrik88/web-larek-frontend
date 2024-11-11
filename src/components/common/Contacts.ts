import { Form } from './Form'
import { IOrderForm } from '../../types'
import { IEvents } from '../base/events'
// import { ensureAllElements } from '../../utils/utils'

export class Сontacts extends Form<IOrderForm> {
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
    }
    set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
    set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
  }