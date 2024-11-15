import { Form } from './common/Form'
import { IUser } from '../types'
import { IEvents } from './base/events'

// import { ensureAllElements } from '../../utils/utils'

export class Contacts extends Form<IUser> {
    constructor(container: HTMLFormElement, events: IEvents) {
      super(container, events);
    }
    set phone(value: string) {
      (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }
    set email(value: string) {
      (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
 
    // Передаем пустой объект в метод render для очистки
    clear(): void {
      // Вызываем render с пустыми значениями
      this.render({
        phone: '', 
        email: '',
        valid: false,
        errors: []
      });
  }
  }