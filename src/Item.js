'use strict';

class Item {
  constructor(name, sellIn, quality) {
    this._name = name;
    this._sellIn = sellIn;
    this._quality = quality;
  }

  get name() {
    return this._name;
  }

  get sellIn() {
    return this._sellIn;
  }

  set sellIn(aNumber) {
    this._sellIn = aNumber;
  }

  get quality() {
    return this._quality;
  }

  set quality(aNumber) {
    this._quality = aNumber;
  }
}

module.exports = Item;
