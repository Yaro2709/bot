const Api = require("../../utils/api/api");
const AipUse = require("../../utils/api/apiUse");
const RequestInChatAdmin = require("./RequestInChatAdmin");

class HandleForm {
  constructor(bot, msg) {
    this.bot = bot;
    this.message = msg;
    this.api = new Api(this.bot);
  }

  async _useApiUpdate(post) {    
    const request = await new AipUse(this.api).updateUser(post);
    if(!request) {
       return
    }    
    await new RequestInChatAdmin(this.bot, request).requestUSer(post)
    return
  }

  async _useApiOrder(post) {
    const api = new Api(this.bot);
    const { tlgId } = post;

    let checkPost = {
      action: "check",
      tlgId: tlgId,
    };

    let user = await api.checkUser(checkPost);    

    if (user) {    

      const request = await api.postOrder(post);     
      await new RequestInChatAdmin(this.bot, request).requestOrder(post, user)
      return;


    }    
  }

  async _useApiMessage(post) {
    const api = new Api(this.bot);
  }

  _determineWhatForm() {
    let dataFormToQuery = {};

    const data = JSON.parse(this.message.web_app_data.data);

    if (data.form == "update") {
      dataFormToQuery.action = data.form;
      dataFormToQuery.name = data.name;
      dataFormToQuery.tlgName = this.message.from.username;
      dataFormToQuery.number = data.number;
      dataFormToQuery.tlgId = `${this.message.from.id}`;
      dataFormToQuery.role = data.role;

     // console.log("dataFormToQuery", dataFormToQuery);
      this._useApiUpdate(dataFormToQuery);
    } else if (data.form == "order") {
      dataFormToQuery.tlgMessageId = `${this.message.message_id}`;
      dataFormToQuery.tlgId = `${this.message.from.id}`;
      dataFormToQuery.form = data.form;
      dataFormToQuery.typeOrder = data.typeOrder;
      dataFormToQuery.city = data.city;
      dataFormToQuery.timeWake = data.timeWake;
      dataFormToQuery.nameContact = data.nameContact;
      dataFormToQuery.number = data.number;
      dataFormToQuery.fio = data.fio;
      dataFormToQuery.dateLeft = data.dateLeft;
      dataFormToQuery.dateWake = data.dateWake;
      dataFormToQuery.comment = data.comment;
      // после проверки
      dataFormToQuery.agentIdSPZ = "Добавить";

      this._useApiOrder(dataFormToQuery);
    } else if (data.form == "message") {
      this._useApiMessage(dataFormToQuery);
    } else {
      throw new Error(" класс: HandleForm, сообщение: форма не разспознана");
    }

    // console.log(dataFormToQuery);
  }

  start() {
    this._determineWhatForm();
  }
}

module.exports = HandleForm;
