'use strict';

class GildedRose {
  constructor(items = []) {
    this._items = items;
  }

  get items() {
    return this._items;
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

  sulfurasTick(item) {
    return;
  }

  backstageTick(item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
    } else {
      if (item.quality < 50) {
        item.quality += 1;
        if (item.sellIn < 11 && item.quality < 50) {
          item.quality += 1;
        }
        if (item.sellIn < 6 && item.quality < 50) {
          item.quality += 1;
        }
      }
    }

    item.sellIn -= 1;
  }

  tick() {
    for (const item of this.items) {
      if (item.name == 'Aged Brie') {
        this.agedBrieTick(item);
      } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
        this.sulfurasTick(item);
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.backstageTick(item);
      } else {
        this.defaultTick(item);
      }
    }
  }
}

module.exports = GildedRose;
