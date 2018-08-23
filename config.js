const {
  PricingRules: { Three4Two, BulkDiscount, FreeBundle }
} = require("./Checkout");
const { Products } = require("./Checkout");

// this is for our indecisive sales manager config pricing rules against products;
// e.g. you can bundle a ipad with a macbook if you really want to
// add more pricingRules inside ./Checkout/pricingRules if you want new pricing rule patterns

const pricingRules = [
  new Three4Two(Products.find(p => p.sku === "atv")),
  new BulkDiscount(Products.find(p => p.sku === "ipd"), 4, 499.99),
  new FreeBundle(
    Products.find(p => p.sku === "mbp"),
    Products.find(p => p.sku === "vga")
  )
];

module.exports = {
  pricingRules
};
