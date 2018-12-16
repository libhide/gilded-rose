'use strict';

const Item = require('./Item');

class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  tick() {}
}

module.exports = ConjuredItem;
