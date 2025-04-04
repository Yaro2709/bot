// errorLog.json

const LoggerManager = require("../log/LoggerManager");
const Command = require("./command.class");
const ApiWeb = require("../utils/api/apiWeb");

class FormCommand extends Command {
  constructor(bot) {
    super(bot);
  }
  handle() {
    this.bot.on("message", async (msg) => {
      try {

        new LoggerManager().logMessage("log", "bot.on(message)", msg);
        const chatId = msg.chat.id;       

        //Меню
        if (msg.text === "/start") {
          return;
        }

        if (msg.text === "/about") {
          return;
        }

        if (msg.text === "/order") {
          return;
        }

        if (msg.text === "/clear") {
          return;
        }

        //Регистрация
        if (msg.text === "/registration") {
          return;
        }

        //Технические команды
        if (msg.text === "/myid") {
          return;
        }

        if (msg.text === "/cleancache") {
          return;
        }

        if (!msg.text) {
          return;
        }

        new ApiWeb(this.bot).botMessage(
          chatId,
          msg.text,
          msg.message_id,
          msg.message_id
        );
        return;
      } catch (error) {
        new LoggerManager().logMessage("error", "error", error.message);
        console.log(error);
      }
    });
  }
}

module.exports = FormCommand;
