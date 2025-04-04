//@ts-check

const SessionOrder = require("../session/session.order");
const ApiWeb = require("../utils/api/apiWeb");
const Command = require("./command.class");

class ClearOrderCommand extends Command {
  constructor(bot) {
    super(bot);
  }

  handle() {
    this.bot.onText(/\/clear/, async (msg) => {
      const chatId = msg.chat.id;
      new ApiWeb(this.bot).botCommandClear(chatId);
    });
  }
}

module.exports = ClearOrderCommand;
