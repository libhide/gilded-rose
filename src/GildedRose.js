'use strict';

const Item = require('./Item');
const DefaultItem = require('./DefaultItem');
const AgedBrieItem = require('./AgedBrieItem');
const BackstageItem = require('./BackstageItem');
const ConjuredItem = require('./ConjuredItem');

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

  _createItem(item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieItem(item.name, item.sellIn, item.quality);
      case 'Sulfuras, Hand of Ragnaros':
        return new Item(item.name, item.sellIn, item.quality);
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstageItem(item.name, item.sellIn, item.quality);
      case 'Conjured Mana Cake':
        return new ConjuredItem(item.name, item.sellIn, item.quality);
      default:
        return new DefaultItem(item.name, item.sellIn, item.quality);
    }
  }

  tick() {
    this.items = this.items.map(i => {
      const item = this._createItem(i);
      item.tick();
      return item;
    });
  }
}

module.exports = GildedRose;
