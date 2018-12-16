'use strict';

const Item = require('./Item');

class SulfurasItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {}
}

module.exports = SulfurasItem;
