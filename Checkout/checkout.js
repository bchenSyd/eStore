class Checkout {
  constructor(pricingRules = []) {
    this.pricingRules = pricingRules;
    // https://github.com/tc39/proposal-class-public-fields stage 2 proposal
    // https://node.green/ not supported yet
    this.items = [];
  }
  scan(item) {
    this.items.push(item);
  }
  total() {
    const priceTotal = this.items.reduce(
      (priceTotal, { price, amount }) => priceTotal + price * amount,
      0
    );
    const reductionTotal = this.pricingRules.reduce((reductions, priceRule) => {
      const reduction = priceRule.apply(this.items);
      return reductions + reduction;
    }, 0);
    return priceTotal - reductionTotal;
  }
}

module.exports = Checkout;
