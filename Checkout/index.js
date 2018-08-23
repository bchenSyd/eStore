const defaultPricingRules = require("./pricingRules");

class Checkout {
  constructor(pricingRules = defaultPricingRules) {
    this.pricingRules = pricingRules;
    // https://github.com/tc39/proposal-class-public-fields stage 2 proposal
    // https://node.green/ not supported yet
    this.items = [];
  }
  scan(item) {
    this.items.push(item);
  }
  total() {
    return this.items.reduce((acc, { price, amount }) => acc + price * amount, 0);
  }
}

module.exports = Checkout;
