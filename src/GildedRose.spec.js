'use strict';

const Item = require('./Item');
const GildedRose = require('./GildedRose');

describe('Gilded Rose', () => {
  describe('Default item, ', () => {
    describe('item name ', () => {
      it('does not change the name', () => {
        const item = new Item('foo', 0, 0);
        const gildedRose = new GildedRose([item]);
        gildedRose.tick();
        expect(gildedRose.items[0].name).toEqual('foo');
      });

      it('lowers quality value by 1 at the end of the day', () => {
        const item = new Item('foo', 1, 1);
        const gildedRose = new GildedRose([item]);
        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(0);
      });
    });

    runSharedTestsItemSellIn('foo');

    describe('item quality', () => {
      runSharedTestsItemQualityValue('foo');

      describe('when sell in date not passed yet', () => {
        it('lowers quality value by 1 at the end of the day', () => {
          const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(0);
        });
        it('lowers quality value by N after N days', () => {
          const n = 10;
          const gildedRose = new GildedRose([new Item('foo', n, n)]);

          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(n - 1);
          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(n - 3);

          gildedRose.tick();
          gildedRose.tick();
          gildedRose.tick();

          gildedRose.tick();
          gildedRose.tick();
          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(0);
        });
        it('lowers quality value twice as fast after N days', () => {
          const n = 5;
          const quality = 15;
          const gildedRose = new GildedRose([new Item('foo', 0, quality)]);

          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(quality - 2 * 1);
          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(quality - 2 * (2 + 1));

          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(quality - 2 * n);
        });
      });
    });
  });

  describe('Aged Brie item, ', () => {
    runSharedTestsItemSellIn('Aged Brie');

    describe('item quality', () => {
      describe('when sell in date not passed yet', () => {
        it('increases by 1 the older it gets', () => {
          const n = 5;
          const gildedRose = new GildedRose([new Item('Aged Brie', n, 0)]);

          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(1);
          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(3);

          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(5);
        });
      });
      describe('when sell in date has passed', () => {
        it('increases twice as fast the older it gets', () => {
          const n = 5;
          const gildedRose = new GildedRose([new Item('Aged Brie', 0, 0)]);

          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(2 * 1);
          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(2 * 3);

          gildedRose.tick();
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(2 * 5);
        });
      });
      it('is never more than 50', () => {
        const n = 2;
        const gildedRose = new GildedRose([new Item('Aged Brie', n, 49)]);

        gildedRose.tick();
        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(50);
      });
    });
  });

  describe('Sulfuras, Hand of Ragnaros item, ', () => {
    let item_name = 'Sulfuras, Hand of Ragnaros';
    describe('item sell in', () => {
      it('does not change the sell in', () => {
        const gildedRose = new GildedRose([new Item(item_name, 0, 0)]);

        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(0);
      });
    });
    describe('item quality', () => {
      runSharedTestsItemQualityValue(item_name);

      it('does not change the quality', function() {
        const gildedRose = new GildedRose([new Item(item_name, 0, 0)]);

        gildedRose.tick();

        expect(gildedRose.items[0].quality).toEqual(0);
      });
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert item, ', () => {
    let item_name = 'Backstage passes to a TAFKAL80ETC concert';

    runSharedTestsItemSellIn(item_name);

    describe('item quality', () => {
      runSharedTestsItemQualityValue(item_name);

      describe('when sell in date not passed yet', () => {
        describe('when sell in above 10 days', () => {
          it('increases by 1 the older it gets', function() {
            const n = 5;
            const quality = 1;
            const gildedRose = new GildedRose([new Item(item_name, 15, quality)]);

            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 1);
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 5);
          });
          it('increases to 50 when sell_in above 10 and quality is 49', function() {
            const gildedRose = new GildedRose([new Item(item_name, 15, 49)]);

            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(50);
          });
          it('increases to 50 instead of 51 when sell_in at least 5 and quality is 49', function() {
            const gildedRose = new GildedRose([new Item(item_name, 5, 49)]);

            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(50);
          });
        });

        describe('when sell in 10 days or less and above 5 days', () => {
          it('increases by 2 the older it gets', function() {
            const n = 5;
            const quality = 1;
            const gildedRose = new GildedRose([new Item(item_name, 10, quality)]);

            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 2 * 1);
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 2 * 5);
          });
          it('increases to 50 instead of 52 when sell_in at least 1 and quality is 49', function() {
            const gildedRose = new GildedRose([new Item(item_name, 1, 49)]);
            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(50);
          });
        });

        describe('when sell in 5 days or less', () => {
          it('increases by 3 the older it gets', function() {
            const n = 5;
            const quality = 1;
            const gildedRose = new GildedRose([new Item(item_name, 5, quality)]);

            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 3 * 1);
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(quality + 3 * 5);
          });
          it('increases to 50 instead of 52 when sell_in at least 1 and quality is 49', function() {
            const gildedRose = new GildedRose([new Item(item_name, 1, 49)]);
            gildedRose.tick();
            expect(gildedRose.items[0].quality).toEqual(50);
          });
        });
      });

      describe('when sell in date has passed', () => {
        it('quality drops to 0 when sell_in date has passed', () => {
          const gildedRose = new GildedRose([new Item(item_name, 0, 5)]);
          gildedRose.tick();
          expect(gildedRose.items[0].quality).toEqual(0);
        });
      });
    });
  });

  xdescribe('Conjured Mana Cake item, ', () => {
    let item_name = 'Conjured Mana Cake';

    runSharedTestsItemSellIn(item_name);

    describe('item quality', () => {
      runSharedTestsItemQualityValue(item_name);

      it('lowers quality value by 2 at the end of the day', () => {
        const gildedRose = new GildedRose([new Item(item_name, 1, 2)]);
        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(0);
      });

      it('lowers quality value twice as fast after N days', () => {
        const n = 5;
        const quality = 15;
        const gildedRose = new GildedRose([new Item(item_name, 1, quality)]);

        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(quality - 2 * 1);
        gildedRose.tick();
        gildedRose.tick();
        gildedRose.tick();
        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(quality - 2 * n);
      });
    });
  });

  function runSharedTestsItemQualityValue(item_name) {
    describe('quality value', () => {
      it('quality value is never negative', () => {
        const gildedRose = new GildedRose([new Item(item_name, 0, 0)]);
        gildedRose.tick();
        expect(gildedRose.items[0].quality).toEqual(0);
      });
      it('quality value is never more than 50', () => {
        const gildedRose = new GildedRose([new Item(item_name, 20, 50)]);
        gildedRose.tick();
        expect(gildedRose.items[0].quality <= 50).toEqual(true);
      });
    });
  }

  function runSharedTestsItemSellIn(item_name) {
    describe('item sell in', () => {
      it('lowers sell in value by 1 at the end of the day', () => {
        const gildedRose = new GildedRose([new Item(item_name, 1, 0)]);
        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(0);
      });
      it('lowers sell in value by  N after N days', () => {
        const n = 10;
        const gildedRose = new GildedRose([new Item(item_name, n, 0)]);

        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(n - 1);
        gildedRose.tick();
        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(n - 3);

        gildedRose.tick();
        gildedRose.tick();
        gildedRose.tick();

        gildedRose.tick();
        gildedRose.tick();
        gildedRose.tick();
        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(0);
      });

      it('sell in value can be negative', () => {
        const gildedRose = new GildedRose([new Item(item_name, 0, 0)]);
        gildedRose.tick();
        expect(gildedRose.items[0].sellIn).toEqual(-1);
      });
    });
  }
});
