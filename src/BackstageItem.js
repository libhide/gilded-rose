'use strict';

const Item = require('./Item');

class BackstageItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {
    if (this.sellIn <= 0) this.quality = 0;
    else {
      if (this.quality < 50) this.quality += 1;
      if (this.sellIn < 11 && this.quality < 50) this.quality += 1;
      if (this.sellIn < 6 && this.quality < 50) this.quality += 1;
    }

    this.sellIn -= 1;
  }
}

module.exports = BackstageItem;
