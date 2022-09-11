import { PopupWithForm } from "./PopupWithForm.js";

export class PopupDelete extends PopupWithForm {
  constructor(popupSelector, submitFormForPopup) {
    super(popupSelector, submitFormForPopup);
  }

  // открытие поп-апа
  open(card) {
    super.open();
    this.card = card;
  }
}