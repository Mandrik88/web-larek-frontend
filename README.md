# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Данные и типы данных, используемые в приложении

Данные о товаре:

export interface IProduct {  
	id: string;  
	description: string;  
	image: string;  
	title: string;  
	category: string;  
	price: number | null;   
}

Данные о пользователе:

export interface IUser {  
	payment?: string;  
	address?: string;  
	email?: string;  
	phone?: string;  
}

Mодель для хранения товаров в каталоге:

export interface IProductData {  
	catalog: IProduct[];
}

Kорзина с ID товаров из каталога и суммой заказа:

export interface IOrderBasket {  
	list: HTMLElement[];   
	total: number;   
}


## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP:

- слой представления, отвечает за отображение данных на странице,
- слой данных, отвечает за хранение и изменение данных
- презентер, отвечает за связь представления и данных.

### Базовый код

#### Класс Api

Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы:

- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.
- `handleResponse` - обрабатывает ответ от API, возвращает данные в формате JSON, если запрос успешен; в случае ошибки возвращает сообщение об ошибке или текст статуса ответа

**Класс Component<T>**

Базовый абстрактный класс Component служит основой для других классов слоя View и других классов слоя представления, упрощая управление элементами DOM.
Класс предоставляет методы для работы с элементами: добавление/удаление классов, управление видимостью, текстом, атрибутами и изображениями.
Класс Component можно расширять для создания более специфических компонентов интерфейса, предоставляя базовые методы для взаимодействия с элементами DOM

Конструктор:
принимает на вход container типа HTMLElement

Методы:

- toggleClass (element: HTMLElement, className: string, force?: boolean) — метод переключения CSS-класса элемента
- setDisabled (element: HTMLElement, state: boolean) — метод влючения или отключения атрибута disabled у кнопки
- setText (element: HTMLElement, value: string) — метод установки текста у HTML-элементов
- setImage (element: HTMLImageElement, src: string, alt?: string) — метод установки изображения и альтернативного текста на элемент img
- setVisible(element: HTMLElement) (protected): делает элемент видимым, при этом удаляя значение свойства display.
- setVisible(element: HTMLElement) (protected): делает элемент видимым, удаляя значение свойства display.
- render (data: Partial<T>) — метод возвращения корневого элемента


#### Класс EventEmitter

Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:

- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

Основные события, которые генерируются в приложении:

- card: select - событие, которое инициируется при клике на конкретный товар из каталога, что ведет за собой открытие модального окна с подробной инфроацией о товаре
- items: change - событие, которое инициируется при изменении списка товаров на странице, что ведет за собой перерисовку списка товаров на странице (оверлэй)
- card: toBasket - событие, которое инициируется по клику на кнопку "В корзину" в карточке товара, что ведест за собой изменение количества товаров в корзине (на значке корзины) и добавление товара в корзину
- preview: change - событие, которое инициируется при передаче моделью новых данных, оповещает слой View, что ведет к отрисовке содержимого модального окна
- modal: close - событие, котрое инициируется при нажатии на крестик в модальном окне, а также при нажатии на кнопку Esc и при клике вне поля модального окна
- modal: open - событие инициируется при нажатии на карточку товара и ее открытии в модальном окне (предпросмотр)
- basket: delete - событие, которое инициируется при клике на кнопку удаления позиции в заказе, внутри корзины, как результат меняется счетчик заказов на главной странице
- basket: placeOnOrder - событие, которое инициируется при клике на кнопку "Оформить" в корзине и влечет за собой открытие модального окна с выбором оплаты
- basket: change- событие, которое инициируется в момент добавления/удаления товара в/из корзины, а также при очистке корзины
- order:submit - (отправка формы с оплатой и адресом) событие, которое инициируется при клике на кнопку "Далее", это ведет за соблой открытие модального окна, в котором пользователю нужно заполнить поля со своими конктактными данными
- contacts: submit - событие, которое слушается при отправке формы с контактными данными пользователя при оформлении заказа
- input: validate - событие, которое инициируется при вводе данных пользовтеля в поля формы, тем самым запуская процесс валидации
- input:error - событие, которое инициируется при вводе данных пользователя в поля формы, при этом выполняется проверка формы и возвращаются ошибки
- order: success - событие, которое инициируется при успешном ответе сервера на запрос об оплате, что ведет за собой откртыие модального окнас с соответствуюей формулировкой "Заказ оформлен"
- order: ready - событие готовности заказа

### Слой данных

**Класс ApiLarek**

Основной класс работы с сервером в проекте. Расширяет базовый класс Api.
Конструктор
принимает передает в родительский конструктор Api поля baseUrl и options
принимает и сохраняет входящий url запроса в cdn

Поля

- cdn — хранит входящий url

Методы

- getProductItems — метод получения списка товаров с сервера
- orderProductsResponse (order: IUser) — метод отправки данных заказа на сервер

**Класс ModelApp**

Модель данных приложения. Этот класс отвечает за хранение, логику работы с данными и методы работы с ними.

В полях класса хранятся следующие данные:

- items: IProduct[] - массив с карточками товаров
- preview: string - предварительный просмотр товара
- basket: IProduct[] - массив для хранения товаров добавленных в корзину
- userData: IUser - свойство харнит информацию о пользователе
- formErrors: FormErrors - свойство исп для хранения ошибок в форме валидации

Список методов для взиамодействия с данными в этом классе:

- addToBasket(id: string): void - метод добавления товара в корзину
- deleteFromBasket(id: string): void - метод удаления товара из корзины
- clearBasket - метод очистки корзины
- getCountsInBasket - метод получения количества товаров в корзине, возвращает общее количество товаров в корзине
- isProductsInBasket(id: string): boolean - метод для проверки наличия товаров в корзине, возвращает массив товаров в корзине
- getIdProductsInBasket - метод получения списка ID товаров в корзине, возвращает список ID товаров в корзине
- getAllPrice - метод получения общей стоимости товаров в корзине, возвращает общую сумму стоимости товаров
- addProducts(cards: IProduct[]) - метод добавления каталога с товарами(массива)
- getProducts(): IProduct[] - метод получения католога с товарами, возвращает массив с карточками товаров
- setPreview(card: IProduct) - метод получения превью товара
- fillUserContacts(field: keyof IUser, value: string): void - метод для заполнения полей с контактными данными пользователя
- validateContacts(): boolean - метод валидации формы с полями ввода adreess, email, phone; возвращает true если заказ валиден, иначе возвращает - false
- clearUser - метод очистки данных о пользователе
- getFormErrors - метод получения ошибок формы, возвращает сообщение об ошибках 
- getFieldPayment - метод получения полей способа оплаты, возвращает способ оплаты
- getIdCard(id: string): IProduct - метод получения карточки по ID, возвращает ID карточки товара
- getBasket(): IProduct[] - метод возвращает массив товаров в корзине
- getUserInfo - метод получения данных о пользователе, возвращает информацию о пользователе

## Слой представления

#### Класс Modal

Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна `render` для отрисовки данных контента. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа. Он наследуюется от базового абстрактного класса Component.
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект event типа IEvents
constructor (container: HTMLElement, protected events: IEvents)

Поля класса

- closeButton — элемент разметки кнопки закрытия модального окна;
- content — разметка контейнера для контента модального окна.

Методы класса

- open - выполянет открытие модального окна
- close - выполняет закрытие модального окна
- render - отображает содержимое окна

**Класс Card**

Отвечает за отображение данных карточки товара в модальном окне, корзине, а также при открытии корзины с каталогом карточек.
Поля отвечают за связь с разметкой, методы реализуют наполнение разметки данными. Расширяет базовый абстрактный класс Component по интерфейсу IProduct.
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект action типа ICardAction для установки слушателя на кнопку или контейнер.
constructor (container: HTMLElement, action?: ICardAction)

Поля класса:

- \_title - хранит разметку заголовка карточки
- \_price - хранит разметку цены карточки
- \_index - хранит разметку с порядковым номером товара в корзине
- \_button - хранит разметку кнопки

Методы класса

- set title - устанавливает заголовок карточки
- set price - устанавливает стоимость карточки
- set id - устанавливает идентификатор товара
- set index - устанавливает порядковый номер карточки
- set button - устанавливает название кнопки

**Класс OnlyCardOnPage**

Отвечает за отображение данных карточки на странице. Наследуется от класса Card. Расширяет класс Card.
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект action типа ICardAction для установки слушателя на кнопку или контейнер.
constructor (container: HTMLElement, action?: ICardAction)

Поля класса:

- \_image - хранит разметку изображения
- \_category - хранит разметку категории

Методы класса

- set image - устанавливает изображение
- set category - устанавливает категорию

**Класс CardPreview**

Отвечает за отображение данных предпросмотра карточки. Наследуется от класса OnlyCardOnPage.
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект action типа ICardAction для установки слушателя на кнопку или контейнер.
constructor (container: HTMLElement, action?: ICardAction)

Поле класса:

- \_description - хранит описание карточки

Метод класса:

- set description - устанавливает описание карточки

**Класс Basket**

Описывает (отображает) корзину с товарами. Расширяет базовый абстрактынй класс Component.
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект event типа IEvents
constructor (container: HTMLElement, protected events: IEvents)

Поля класса:

- productListItem — блок для отображения списка карточек товаров
- totalElement — хранит разметку cуммы товаров в корзине
- button — элемент для перехода к оформлению заказа

Методы класса:

- set list — устанавливает товары в разметку
- set total — устанавливает значение суммы товаров

**Класс Form**

Данный класс отвечает за способы работы с формой в приложениии (управляет отображением ошибок и активностью кнопки сабмита).
Расширяет базовый абстрактынй класс Component.
Конструктор принимает container типа HTMLElement, передавая его в родительский конструктор, а также объект event типа IEvents.

Поля класса:

- submit — хранит разметку кнопки отправки формы
- errors — хранит разметку вывода ошибок валидации

Методы класса:

- onInputChange — регистрирует событие с именем конкретного поля
- set valid — метод установки валидности
- set errors - устанавливает текст ошибки
- render — создание и отрисовка формы и ее элементов на странице

**Класс Order**

Данный класс отвечает за отображение способа оплаты и адреса доставки в модальном окне. Этот класс расширяет класс Form по интерфейсу IOrderForm. Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект event типа IEvents.
constructor (container: HTMLElement, protected events: IEvents)

Поля класса:

- button — хранит разметку кнопок формы оплаты

Методы класса:

- set payment — устанавливает значение payment
- set address — устанавливает значение поля адрес

**Класс Contacts**

Данный класс отвечает за отображение контактов покупателя в соответствующем модальном окне.
Расширяет класс Form по интерфейсу IOrderForm.

Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект event типа IEvents

Методы класса:

- set phone — устанавливает значение поля телефона
- set email — устанавливает значение поля почты

**Класс Success**

Данный класс отвечает за отображение успешной покупки.
Рассширяет базовый абстрактный класс Component
Конструктор принимает container типа HTMLElement, передавая container в родительский конструктор и объект event типа IEvents

Поля класса:

- all price — разметка общей суммы товаров в заказе

Методы класса:

- set total — установка значения общей суммы

**Класс Page**

Данный класс отвечает за отображение данных основных элементов на странице приложения. К таковы относятся: каталог товаров, корзина, счетчик товаров в корзине. Рассширяет базовый абстрактный класс Component по интерфейсу IProductData. Конструктор класса принимает container типа HTMLElement, передавая его в родительский конструктор, а также объект event типа IEvents.
Поля отвечают за связь с разметкой, методы за наполнение разметки данными, а также метод закрытия/открытия для прокрутки страницы при открытии/закрытии модального окна.

Поля класса:

- counter - хранится разметка счетчика товаров в корзине
- catalog — хранит разметку каталога товаров
- wrapper — хранит разметку обертки страницы
- basket — хранит разметку кнопки корзины

Методы класса:

- set counter - отображение счётчика товаров в корзине
- set catalog - отображение карточек товаров на странице
- set locked - устанавливает класс, блокирующий прокрутку страницы

 В работе был использован событийно-ориентированный подход. Пример взаимодействия слоев: модель-вью-презентер. Описание конкретной ситуации: пользователь кликнул по карте, на это действие реагирует класс Card из слоя вью - генерируется событие 'card: select'; презентер обрабатывает данное событие и вызывает метод setPreview модели данных для изменения данных; модель изменяет в поле класса preview и генерирует событие 'preview: change'; презентер обрабатывает событие и вызывает рендер вью передавая в нее данные из модели, данные передаются,  класс CardPreview перерисовывается.