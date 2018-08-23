class PriceRuleBase {
  constructor(item) {
    this.item = item;
    this.reduction = 0;
  }
  apply(items) {
    throw new Error("implement your own price rule");
  }
}

class Three4Two extends PriceRuleBase {
  apply(items) {
    const { sku, price } = this.item;
    const count = items.filter(item => item.sku === sku).length;
    this.reduction = (count / 3) * price;
  }
}

class BulkDiscount extends PriceRuleBase {
  constructor(item, discountedPrice) {
    super(item);
    if (discountedPrice > item.price) {
      throw new Error("discounted price should be less than original price");
    }
    this.discountedPrice = discountedPrice;
  }
  apply(items) {
    const { sku, price: originalPrice, discountedPrice } = this.item;
    const count = items.filter(item => item.sku === sku).length;
    this.reduction = count * (originalPrice - discountedPrice);
  }
}

////// CAUTION:
// the bundling item is for free, while the item being bundled to is still charged the full amount
// please read this rule carefully to avoid giving the wrong item for free!
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
      sku,
      bundlingItem: { sku: bundlingSku, price: bundlingPrice }
    } = this;
    const itemCount = items.filter(item => item.sku === sku).length;
    const bundleCount = items.filter(item => item.sku === bundlingSku).length;
    const count = itemCount < bundleCount ? itemCount : bundleCount; //take the lesser of the two
    this.reduction = count * bundlingPrice;
  }
}

module.exports = {
  Three4Two,
  BulkDiscount,
  FreeBundle
};
