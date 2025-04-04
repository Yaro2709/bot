// @ts-check

require("dotenv").config();
const Bot = require("./src/bot/Bot");
const LoggerManager = require("./src/log/LoggerManager");
const RegisrtationCommand = require("./src/commands/Regisrtation.command");
const OrderCommand = require("./src/commands/Order.command");
const FormCommand = require("./src/commands/Form.command");
const Command = require("./src/commands/command.class");
const ButtonsCommand = require("./src/commands/Button.command");
const ClearOrderCommand = require("./src/commands/ClearOrder.command");
const MyIdCommand = require("./src/commands/MyId.command");
const CleanCacheCommand = require("./src/commands/CleanCache.command");
const ContactCommand = require("./src/commands/Contact.command");
const PhotoCommand = require("./src/commands/Photo.command");
const AboutCommand = require("./src/commands/About.command");

const token = process.env.TELEGRAMM_TOKEN;
const TELEGRAMM_ADMIN_CHAT = process.env.TELEGRAMM_ADMIN_CHAT;

const bot = new Bot(token);

try {  
    
  bot.start();
  const loggerManager = new LoggerManager();

  // Создаем массив команд
  const commands = [
    new RegisrtationCommand(bot.bot),
    new OrderCommand(bot.bot),
    new FormCommand(bot.bot),
    new ButtonsCommand(bot.bot),
    new ClearOrderCommand(bot.bot),
    new MyIdCommand(bot.bot),
    new CleanCacheCommand(bot.bot),
    new ContactCommand(bot.bot),
    new PhotoCommand(bot.bot),
    new AboutCommand(bot.bot)
  ];
  
  commands.forEach(command => command.handle());
  
  loggerManager.logMessage("log", "старт", "Произошел старт бота");   
  
} catch (error) {
  new LoggerManager().logMessage("error", "error", error.message);
  console.log(error);

  const erronRequest = new Command(bot.bot);

  if (TELEGRAMM_ADMIN_CHAT) {
    erronRequest.requestMessage(TELEGRAMM_ADMIN_CHAT, JSON.stringify(error));
  }  
 
}

