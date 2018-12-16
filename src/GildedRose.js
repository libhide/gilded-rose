'use strict';

const DefaultItem = require('./DefaultItem');

class GildedRose {
  constructor(items = []) {
    this._items = items;
  }

  get items() {
    return this._items;
  }

  set items(aList) {
    this._items = aList;
  }

  defaultTick(item) {
    if (item.quality != 0) {
      if (item.sellIn > 0) item.quality -= 1;
      if (item.sellIn <= 0) item.quality -= 2;
    }

    item.sellIn -= 1;
  }

  agedBrieTick(item) {
    if (item.quality < 50) {
      if (item.sellIn > 0) item.quality += 1;
      if (item.sellIn <= 0) item.quality += 2;
    }

    item.sellIn -= 1;
  }

  sulfurasTick(item) {}

  backstageTick(item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      if (item.quality < 50) item.quality += 1;
      if (item.sellIn < 11 && item.quality < 50) item.quality += 1;
      if (item.sellIn < 6 && item.quality < 50) item.quality += 1;
    }

    item.sellIn -= 1;
  }

  tick() {
    this.items = this.items.map(item => {
      switch (item.name) {
        case 'Aged Brie':
          this.agedBrieTick(item);
          return item;
        case 'Sulfuras, Hand of Ragnaros':
          this.sulfurasTick(item);
          return item;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.backstageTick(item);
          return item;
        default: {
          const defaultItem = new DefaultItem(item.name, item.sellIn, item.quality);
          defaultItem.tick();
          return defaultItem;
        }
      }
    });
  }
}

module.exports = GildedRose;
