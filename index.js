class OrderTracker {
  static #instance = null;
  static #orders = [];
  static create() {
    if (!this.#instance) {
      this.#instance = new OrderTracker();
    }
    return this.#instance;
  }
  static add(item) {
    this.#orders.push(item);
  }
  static get() {
    return this.#orders;
  }
}
console.log("Завдання 1 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо єдиний екземпляр класу OrderTracker
const tracker = OrderTracker.create();

// Додаємо замовлення до списку
OrderTracker.add("Телефон");
OrderTracker.add("Ноутбук");

// Отримуємо список замовлень
const orders = OrderTracker.get();

// Виводимо список замовлень в консоль
console.log(orders);
// ===================================================================================================================
class Book {
  constructor({ title, author, coverColor }) {
    this.title = title;
    this.author = author;
    this.coverColor = coverColor;
  }
  describe() {
    return `Книга: '${this.title}', автор: '${this.author}', колір обкладинки: '${this.coverColor}'`;
  }
}

class AudioBook {
  constructor({ title, author, audioLength }) {
    this.title = title;
    this.author = author;
    this.audioLength = audioLength;
  }
  describe() {
    return `Аудіокнига: '${this.title}', автор: '${this.author}', тривалість: '${this.audioLength}'`;
  }
}

class ProductFactory {
  static TYPE = {
    BOOK: "book",
    AUDIOBOOK: "audiobook",
  };
  static createProduct(type, options) {
    switch (type) {
      case this.TYPE.BOOK:
        return new Book(options);
      case this.TYPE.AUDIOBOOK:
        return new AudioBook(options);
      default:
        throw new Error(`Такого типу продукту не існує: ${type}`);
    }
  }
}
console.log("Завдання 2 ====================================");
// Після виконання розкоментуйте код нижче

// Використовуємо ProductFactory для створення нової книги
const factoryBook = ProductFactory.createProduct(ProductFactory.TYPE.BOOK, {
  title: "Назва книги",
  author: "Автор книги",
  coverColor: "Синій",
});

// Виводимо в консоль опис нової книги
console.log(factoryBook.describe());

// Використовуємо ProductFactory для створення нової аудіокниги
const factoryAudiobook = ProductFactory.createProduct(
  ProductFactory.TYPE.AUDIOBOOK,
  {
    title: "Назва аудіокниги",
    author: "Автор аудіокниги ",
    audioLength: "5 годин",
  }
);

// Виводимо в консоль опис нової аудіокниги
console.log(factoryAudiobook.describe());

// Спробуємо створити продукт непідтримуваного типу
try {
  const factoryUnknown = ProductFactory.createProduct("comics", {});
} catch (error) {
  // Виводимо помилку в консоль
  console.error(error.message);
}
// =========================================================================================================================

class Customer {
  constructor(email) {
    this.email = email;
  }
  sendEmail(message) {
    console.log(`${this.email} ${message}`);
  }
}

class Product {
  constructor(name) {
    this.name = name;
  }
}

class Store {
  constructor(name) {
    this.name = name;
    this.customers = [];
  }
  subscribe(customer) {
    this.customers.push(customer);
  }
  unsubscribe(customer) {
    this.customers = this.customers.filter((sub) => sub !== customer);
  }
  createProduct(name) {
    const product = new Product(name);
    this.sendNotify(product);
  }
  sendNotify(product) {
    this.customers.forEach((customer) => {
      customer.sendEmail(
        `Новий продукт "${product.name}" в магазині ${this.name}!`
      );
    });
  }
}

console.log("Завдання 3 ====================================");

const store = new Store("IT Supermarket");

const customer1 = new Customer("john@example.com");
const customer2 = new Customer("jane@example.com");
const customer3 = new Customer("alice@example.com");

store.subscribe(customer1);
store.subscribe(customer2);
store.subscribe(customer3);

store.createProduct("Новий ноутбук");

store.unsubscribe(customer1);

store.createProduct("Бездротові навушники");
// ==================================================================================================================================

class Drink {
  price = 10;
  name = "Чай";
  prepare() {
    console.log(`Приготування ${this.name}`);
  }
}

class HoneyDecorator {
  constructor(drink, amount) {
    this.drink = drink;
    this.amount = amount;
  }
  get name() {
    return `${this.drink.name} з ${this.amount} г меду`;
  }
  get price() {
    const honeyPrice = 0.5;
    return this.drink.price + honeyPrice * this.amount;
  }
  prepare() {
    console.log(`Приготування ${this.name} з медом`);
  }
}
console.log("Завдання 4 ====================================");

let tea = new Drink();
console.log(tea.name); // Виводить ім'я напою
console.log(tea.price); // Виводить вартість напою
tea.prepare(); // Готує напій

let honeyTea = new HoneyDecorator(tea, 2); // Додаємо 2 грами меду
console.log(honeyTea.name); // Виводить нову назву напою
console.log(honeyTea.price); // Виводить нову вартість напою
honeyTea.prepare(); // Готує напій з медом
// =============================================================================================================================

class Writer {
  #content = "";
  set content(newContent) {
    this.#content = newContent;
    this.#store();
  }
  get content() {
    return this.#content;
  }
  #store() {
    Version.create(this.content);
  }
  restore() {
    this.#content = Version.restore().content;
  }
}

class Version {
  constructor(content) {
    this.content = content;
  }
  static #versions = [];
  static create(content) {
    this.#versions.push(new Version(content));
  }
  static restore() {
    this.#versions.pop();
    return this.#versions[this.#versions.length - 1];
  }
}
console.log("Завдання 5 ====================================");

const writer = new Writer();

// Присвоюємо текст за допомогою сетера
writer.content = "Це початковий текст.";
writer.content = "Редагований текст.";
writer.content = "Оновлений текст.";

// Друкуємо поточний текст
console.log(writer.content);

// Відновлюємо попередній текст
writer.restore();
console.log(writer.content);

// Ще раз відновлюємо попередній текст
writer.restore();
console.log(writer.content);
// ============================================================================================================

class AuthProcessor {
  setNextProcessor(processor) {
    this.nextProcessor = processor;
    return processor;
  }
  validate(username, passkey) {
    if (this.nextProcessor) {
      let result = this.nextProcessor.validate(username, passkey);
      return result;
    } else {
      return false;
    }
  }
}

class TwoStepProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (
      username === "john" &&
      passkey === "password" &&
      this.isValidTwoStepCode()
    ) {
      console.log("Вхід дозволено з двофакторною аутентифікацією");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
  isValidTwoStepCode() {
    return true;
  }
}

class RoleProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "guest") {
      console.log("Вхід дозволено з роллю гостя");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
}

class CredentialsProcessor extends AuthProcessor {
  validate(username, passkey) {
    if (username === "admin" && passkey === "admin123") {
      console.log("Вхід дозволено за обліковими даними");
      return true;
    } else {
      return super.validate(username, passkey);
    }
  }
}

class ProcessorBuilder {
  constructor() {
    this.firstProcessor = null;
    this.lastProcessor = null;
  }
  add(processor) {
    if (!this.firstProcessor) {
      this.firstProcessor = processor;
      this.lastProcessor = processor;
    } else {
      this.lastProcessor.setNextProcessor(processor);
      this.lastProcessor = processor;
    }
    return this;
  }
  create() {
    return this.firstProcessor;
  }
}
console.log("Завдання 6 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо Builder для ланцюга обробників.
const processorBuilder = new ProcessorBuilder();

// Додаємо обробники в ланцюг за допомогою builder'а.
const processor = processorBuilder
  .add(new CredentialsProcessor())
  .add(new TwoStepProcessor())
  .add(new RoleProcessor())
  .create();

// Перевіряємо користувачів за допомогою нашого ланцюга обробників.
processor.validate("admin", "admin123"); // Вхід дозволено за обліковими даними
processor.validate("john", "password"); // Вхід дозволено з двоступінчастою аутентифікацією
processor.validate("guest", "guest123"); // Вхід дозволено з роллю гостя
processor.validate("user", "password"); // Вхід заборонено
// ===================================================================================================

class Participant {
  constructor(alias, communicator) {
    this.alias = alias;
    this.communicator = communicator;
  }
  dispatchMessage(text) {
    const message = this.prepareMessage(text);
    this.communicator.transmit(message);
  }
  prepareMessage(text) {
    return `[${this.alias}]: ${text}`;
  }
}

class SMSCommunicator {
  static transmit(message) {
    console.log(`Відправлено SMS: ${message}`);
  }
}

class EmailCommunicator {
  static transmit(message) {
    console.log(`Відправлено Email: ${message}`);
  }
}

console.log("Завдання 7 ====================================");
// Після виконання розкоментуйте код нижче

// Створюємо двох користувачів - Max та Linda - які відправляють повідомлення за допомогою різних засобів комунікації.
const max = new Participant("Max", SMSCommunicator);
const linda = new Participant("Linda", EmailCommunicator);

// Max відправляє повідомлення через SMS.
max.dispatchMessage("Hello!"); // Виведе: Відправлено SMS: [Max]: Hello!

// Linda відправляє повідомлення через Email.
linda.dispatchMessage("Hello!"); // Виведе: Відправлено Email: [Linda]: Hello!
