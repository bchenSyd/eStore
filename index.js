const chalk = require("chalk");
const { prompt, Separator } = require("inquirer");
const { Checkout, Products } = require("./Checkout");

const start_checkout = "CHECK OUT";

// normalize products for UI (also called a UI adapter)
const products = Products.map(p => ({
  name: p.name,
  value: { ...p }
}));

const pricingRules = [
  new Three4Two()
]

const checkout = async () => {
  const checkout = new Checkout();
  while (true) {
    const scannedItem = await prompt([
      {
        type: "list",
        name: "item",
        message: "please choose and item :",
        choices: [...products, new Separator(), start_checkout],
        pageSize: products.length + 2
      },
      {
        type: "input",
        name: "amount",
        message: "please enter the amount :",
        filter: amt => Number(amt),
        validate: amt => (isNaN(amt) ? "please enter a valid amount" : true),
        when: ({ item }) => item !== start_checkout
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

    const { item, amount, confirm } = scannedItem;
    if (item === start_checkout) {
      if (confirm) {
        const amountPayable = checkout.total();
        console.log(
          chalk.cyan(
            `total payable is ${amountPayable}. Thank you for shopping with us`
          )
        );
      } else {
        //user cancelled checkout
        console.log(chalk.grey("operation cancelled"));
      }
      break;
    }
    checkout.scan({ ...item, amount });
  }
};

checkout();
