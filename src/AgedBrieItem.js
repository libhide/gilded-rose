'use strict';

const Item = require('./Item');

class AgedBrieItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {
    if (this.quality < 50) {
      if (this.sellIn > 0) this.quality += 1;
      if (this.sellIn <= 0) this.quality += 2;
    }

    this.sellIn -= 1;
  }
}

module.exports = AgedBrieItem;
