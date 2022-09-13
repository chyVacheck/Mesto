import { PopupWithForm } from "./PopupWithForm.js";

export class PopupDelete extends PopupWithForm {
  constructor(data, submitFormForPopup) {
    super(data, submitFormForPopup);
  }

  // открытие поп-апа
  open(card) {
    super.open();
    this.card = card;
  }
}