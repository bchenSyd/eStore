const { Three4Two, BulkDiscount, FreeBundle } = require("./pricingRules");
describe("pricing rules", () => {
  it("should handle Three for Two correctly", () => {
    const atv = {
      sku: "atv",
      price: 109.5
    };
    const vga = {
      sku: "vga",
      price: 30
    };

    const three4Two = new Three4Two(atv);

    const items = [atv, atv, vga];
    expect(three4Two.apply(items)).toBe(0);

    const items1 = [atv, atv, atv, vga];
    expect(three4Two.apply(items1)).toBe(109.5);

    const items2 = [atv, atv, atv, atv, vga];
    expect(three4Two.apply(items2)).toBe(109.5);

    const items3 = [atv, atv, atv, atv, atv, atv, vga];
    expect(three4Two.apply(items3)).toBe(109.5 * 2);
  });

  it("should handle Bulk Discount correctly", () => {
    const ipd = {
      sku: "ipad",
      price: 549.99
    };
    const vga = {
      sku: "vga",
      price: 30
    };

    const bulkDiscount = new BulkDiscount(ipd, 4, 499.99);
    const itmes = [ipd, vga, ipd, ipd, ipd];
    expect(bulkDiscount.apply(itmes)).toBe(0);

    const items1 = [ipd, vga, ipd, ipd, ipd, ipd];
    expect(bulkDiscount.apply(items1)).toBe(50 * 5);
  });

  it("should handle Free Bundle correctly", () => {
    const mbp = {
      sku: "mbp",
      price: 1399.99
    };
    const vga = {
      sku: "vga",
      price: 30
    };

    const freeBundle = new FreeBundle(mbp, vga);
    const itmes = [mbp, vga];
    expect(freeBundle.apply(itmes)).toBe(30);

    const items1 = [mbp, vga, vga];
    expect(freeBundle.apply(items1)).toBe(30);

    const items2 = [mbp, vga, vga, mbp, mbp];
    expect(freeBundle.apply(items2)).toBe(60);
  });
});
