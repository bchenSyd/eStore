const { prompt, Separator } = require("inquirer");
const chalk = require("chalk");

const products = require("./Checkout/products");

const no_more_items = "NO MORE ITEMS";
const checkout = async () => {
  const items = [];
  while (true) {
    const scannedItem = await prompt([
      {
        type: "list",
        name: "item",
        message: "select an item from the list",
        choices: [no_more_items, new Separator(), ...products],
        pageSize: 4 //choices.length,
      },
      {
        type: "input",
        name: "amount",
        message: "please enter the amount :",
        validate: amt => (isNaN(amt) ? "please enter a valid amount" : true),
        when: ({ item }) => item !== no_more_items
      },
      {
        type: "expand",
        name: "confirm",
        message: "checkout? ",
        default: 2, // avoid accidental checkout
        choices: [
          { key: "y", name: "Yes", value: true },
          { key: "n", name: "No", value: false }
        ],
        when: ({ item }) => item === no_more_items
      }
    ]);

    const { item, amount, confirm } = scannedItem;
    if (item === no_more_items) {
      if (confirm) {
        // todo: calculate amount paylable
        console.log(chalk.cyan("thank you for shopping with us"));
      } else {
        //user cancelled
        console.log(chalk.grey("operation cancelled"));
      }
      break;
    }
  }
};

checkout();
