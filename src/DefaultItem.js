'use strict';

const Item = require('./Item');

class DefaultItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {
    if (this.quality != 0) this.sellIn > 0 ? (this.quality -= 1) : (this.quality -= 2);
    this.sellIn -= 1;
  }
}

module.exports = DefaultItem;
