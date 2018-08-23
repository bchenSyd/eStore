const chalk = require("chalk");
const { prompt, Separator } = require("inquirer");
const { Checkout, Products } = require("./Checkout");
const { pricingRules } = require("./config");
const start_checkout = "CHECK OUT";

// normalize products for displaying in UI (also called a model adapter)
const products = Products.map(p => ({
  name: p.name,
  value: { ...p }
}));

const doCheckout = async () => {
  const checkout = new Checkout(pricingRules);
  while (true) {
    const scannedItem = await prompt([
      {
        type: "list",
        name: "item",
        message: "scan an item (choose from the list) :",
        choices: [...products, new Separator(), start_checkout],
        pageSize: products.length + 2
      },
      {
        type: "expand",
        name: "confirm",
        message: "checkout? ",
        default: 2, // you can cancel the checkout
        choices: [
          { key: "y", name: "Yes", value: true },
          { key: "n", name: "No", value: false }
        ],
        when: ({ item }) => item === start_checkout
      }
    ]);

    const { item, confirm } = scannedItem;
    if (item === start_checkout) {
      if (confirm) {
        // user confirm to checkout
        const total = checkout.total();
        console.log(
          chalk.cyan(
            `total payable is ${total}. Thank you for shopping with us`
          )
        );
      } else {
        //user cancelled checkout
        console.log(chalk.grey("operation cancelled"));
      }
      break;
    }

    checkout.scan(item);
  }
};

doCheckout();
