const { prompt, Separator } = require("inquirer");

const no_more_items = "NO MORE ITEMS";
const checkout = async () => {
  const items = [];
  while (true) {
    const scannedItem = await prompt([
      {
        type: "list",
        name: "item",
        message: "select an item from the list",
        choices: [
          no_more_items,
          new Separator(),
          {
            name: "ipad",
            value: 549.99
          },
          {
            name: "mackbook",
            value: 1399.99
          }
        ],
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
        message:"checkout? ",
        default: 2, // avoid accidental checkout
        choices: [{ key: "y", name: "Yes", value: true }, { key: "n", name: "No", value: false }],
        when: ({ item }) => item === no_more_items
      },
    ]);

    const { item, amount } = scannedItem;
    if (item === no_more_items) {
      break;
    }
  }
};

checkout();
