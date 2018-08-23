const Checkout = require(".");

describe("checkout", () => {
  it("should do price correctly", () => {
    const checkout = new Checkout();
    checkout.scan({
      price: 1.2,
      amount: 1
    });
    checkout.scan({
      price: 2.1,
      amount: 2
    });
    const total = checkout.total();
    expect(total).toBe(5.4);
  });
});
