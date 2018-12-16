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
      if (
        item.name != 'Aged Brie' &&
        item.name != 'Backstage passes to a TAFKAL80ETC concert' &&
        item.name != 'Sulfuras, Hand of Ragnaros'
      ) {
        this.defaultTick(item);
        return;
      } else if (item.name == 'Aged Brie') {
        this.agedBrieTick(item);
        return;
      } else if (item.name == 'Sulfuras, Hand of Ragnaros') {
        this.sulfurasTick(item);
        return;
      } else if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
        this.backstageTick(item);
        return;
      } else {
        // not-implemented yet
      }

      if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality = item.quality - 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality = item.quality + 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }

      if (item.name != 'Sulfuras, Hand of Ragnaros') {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        if (item.name != 'Aged Brie') {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
              if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.quality = item.quality - 1;
              }
            }
          } else {
            item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
          }
        }
      }
    }
  }
}

module.exports = GildedRose;
