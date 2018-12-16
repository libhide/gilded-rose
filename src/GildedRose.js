'use strict';

const DefaultItem = require('./DefaultItem');
const AgedBrieItem = require('./AgedBrieItem');
const SulfurasItem = require('./SulfurasItem');
const BackstageItem = require('./BackstageItem');

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

  tick() {
    this.items = this.items.map(item => {
      switch (item.name) {
        case 'Aged Brie': {
          const agedBrieItem = new AgedBrieItem(item.name, item.sellIn, item.quality);
          agedBrieItem.tick();
          return agedBrieItem;
        }
        case 'Sulfuras, Hand of Ragnaros': {
          const sulfurasItem = new SulfurasItem(item.name, item.sellIn, item.quality);
          sulfurasItem.tick();
          return sulfurasItem;
        }
        case 'Backstage passes to a TAFKAL80ETC concert': {
          const backstageItem = new BackstageItem(item.name, item.sellIn, item.quality);
          backstageItem.tick();
          return backstageItem;
        }
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
