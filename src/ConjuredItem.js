'use strict';

const Item = require('./Item');

class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {
    if (this.quality > 0) this.quality -= 2;
    this.sellIn -= 1;
  }
}

module.exports = ConjuredItem;
