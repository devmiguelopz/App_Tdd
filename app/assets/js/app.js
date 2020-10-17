import { User } from "./user.model.js";
import Config from "./config.js"

export default class App {
  Designer = {
    TxtName: {},
    TxtAge: {},
    TxtIdentity: {},
    TxtDirection: {},
  }

  Initialize(){
    this.LoadDesigner();
    this.LoadData();
  }

  LoadDesigner(){
    this.Designer.TxtName = document.getElementById("txt-name");
    this.Designer.TxtAge = document.getElementById("txt-age");
    this.Designer.TxtIdentity = document.getElementById("txt-identity");
    this.Designer.TxtDirection = document.getElementById("txt-address");
    this.Designer.FormUser = document.getElementById("form-user");
    this.Designer.FormUser.addEventListener("submit",(e)=>{
      e.preventDefault();
      alert(this.Save(this.GetModelByForm()).Message)
    })
  }

  LoadData(){
    this.SetDataForm(this.GetDataLocalStorage());
  }

  GetDataLocalStorage() {
    return localStorage.getItem(Config.KeyLS) ? this.ConvertLocalStorageToUserModel() : new User()
  }

  ConvertLocalStorageToUserModel() {
    const objUserModelLocalStorage = JSON.parse(localStorage.getItem(Config.KeyLS))
    const objUserModel = new User();
    objUserModel.Name = objUserModelLocalStorage.Name;
    objUserModel.Age = objUserModelLocalStorage.Age;
    objUserModel.Identity = objUserModelLocalStorage.Identity;
    objUserModel.Direction = objUserModelLocalStorage.Direction;
    return objUserModel;
  }

  SaveLocalStorage(objUserModel) {
    localStorage.setItem(Config.KeyLS, JSON.stringify(objUserModel));
    return true;
  }

  SetDataForm(objUserModel) {
    this.Designer.TxtName.value = objUserModel.Name;
    this.Designer.TxtAge.value = objUserModel.Age;
    this.Designer.TxtIdentity.value = objUserModel.Identity;
    this.Designer.TxtDirection.value = objUserModel.Direction;
  }

  GetModelByForm() {
    const objUserModel = new User();
    objUserModel.Name =  this.Designer.TxtName.value;
    objUserModel.Age =  +this.Designer.TxtAge.value;
    objUserModel.Identity =  +this.Designer.TxtIdentity.value;
    objUserModel.Direction =  this.Designer.TxtDirection.value;
    return objUserModel;
  }

  ValidateDataForm(objUserModel) {
    if (objUserModel.Name === "") {
      return {
        Message: "Insert correct name",
        Result: false
      }
    }
    if (objUserModel.Age === "" || objUserModel.Age < 18) {
      return {
        Message: "Insert correct age",
        Result: false
      }
    }
    if (objUserModel.Identity === "") {
      return {
        Message: "Insert correct identity",
        Result: false
      }
    }
    if (objUserModel.Direction === "") {
      return {
        Message: "Insert correct direction",
        Result: false
      }
    }
    return { Result: true };
  }

  Save(objUserModel) {
    try {
      const responseService = this.ValidateDataForm(objUserModel);
      if (responseService.Result) {
        this.SaveLocalStorage(objUserModel);
        responseService.Message = "Success Save"
      }
      return responseService;
    } catch (error) {
      return {
        Message: "Error processing data",
        Result: false
      }
    }
  }
}

