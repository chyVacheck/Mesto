
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.addItem = this.addItem.bind(this);
  }

  //принимает DOM-элемент и добавляет его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
  // я попытался сделать, что вы сказали, но у меня не получилось :((
  // ваш коментарий был серым, так что надеюусь за это сообщение мне не влетит

  //вызывает renderer для каждого элемента
  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item); // вызываем renderer, передав item
    });
  }

}