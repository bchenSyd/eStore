const Checkout = require("./checkout");

describe("checkout", () => {
  it("should calculate price correctly without pricing rules", () => {
    const checkout = new Checkout();
    const items = [
      {
        sku: "ipd",
        price: 549.99
      },
      {
        sku: "vga",
        price: 30
      }
    ];
    for (item of items) {
      checkout.scan(item);
    }
    expect(checkout.total()).toBe(579.99);
  });
  it("should calculate price correctly with pricing rules", () => {
    const dummyPricingRules=[
      {
        apply: ()=> 5
      },
      {
        apply: ()=> 5
      }
    ]
    const checkout = new Checkout(dummyPricingRules);
    const items = [
      {
        sku: "ipd",
        price: 549.99
      },
      {
        sku: "vga",
        price: 30
      }
    ];
    for (item of items) {
      checkout.scan(item);
    }

    // with 2 pricing rules applied, total saving should be $10
    expect(checkout.total()).toBe(579.99 - 10);
  });
});
