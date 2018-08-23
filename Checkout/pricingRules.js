// typescript interface definition
// interface IPriceRule{
//   Number apply(items: Product[])
// }

class PriceRuleBase {
  constructor(item) {
    this.item = item;
  }
  apply(items) {
    throw new Error("should return the total reduction");
  }
}

class Three4Two extends PriceRuleBase {
  apply(items) {
    const { sku, price } = this.item;
    const count = (items.filter(item => item.sku === sku) || []).length;
    const reduction = parseInt(count / 3) * price;
    return reduction;
  }
}

class BulkDiscount extends PriceRuleBase {
  constructor(item, bulkAmount, discountedPrice) {
    super(item);
    if (discountedPrice > item.price) {
      throw new Error("discounted price should be less than original price");
    }
    this.bulkAmt = bulkAmount;
    this.discountedPrice = discountedPrice;
  }
  apply(items) {
    const {
      bulkAmt,
      item: { sku, price: originalPrice },
      discountedPrice
    } = this;
    const count = (items.filter(item => item.sku === sku) || []).length;
    if (count > bulkAmt) {
      const reduction = count * (originalPrice - discountedPrice);
      return reduction;
    }
    return 0;
  }
}

class FreeBundle extends PriceRuleBase {
  constructor(
    item /*will be charged the full amount*/,
    bundlingItem /*free of charge*/
  ) {
    super(item);
    this.bundlingItem = bundlingItem;
  }

  apply(items) {
    const {
      item: { sku },
      bundlingItem: { sku: bundlingSku, price: bundlingPrice }
    } = this;
    const itemCount = (items.filter(item => item.sku === sku) || []).length;
    const bundlingCount = (items.filter(item => item.sku === bundlingSku) || [])
      .length;
    const count = itemCount < bundlingCount ? itemCount : bundlingCount; //take the lesser of the two
    const reduction = count * bundlingPrice;
    return reduction;
  }
}

// new price rules here;

module.exports = {
  Three4Two,
  BulkDiscount,
  FreeBundle
};
